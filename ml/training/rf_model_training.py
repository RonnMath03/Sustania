import numpy as np
import sys
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import logging
from datetime import datetime
import os

# Define base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Define subdirectories
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
MODELS_DIR = os.path.join(BASE_DIR, 'ml', 'models')
DATASET_DIR = os.path.join(BASE_DIR, 'ml', 'training', 'dataset')

# Create directories if they don't exist
os.makedirs(LOGS_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)

# Update paths for data
INPUT_DATASET = os.path.join(DATASET_DIR, 'input_dataset.csv')
MODEL_PATH = os.path.join(MODELS_DIR, 'irrigation_model.joblib')

# Update paths for logs and images
LOG_FILE = os.path.join(LOGS_DIR, f'training_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log')
PLOT_DIR = os.path.join(LOGS_DIR, 'plots')
os.makedirs(PLOT_DIR, exist_ok=True)

def save_plot(name, fig):
    """Save plots to logs directory"""
    plot_path = os.path.join(PLOT_DIR, f'{name}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png')
    fig.savefig(plot_path)

# Set up logging with both file and console handlers
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)

class IrrigationMLPipeline:
    def __init__(self, input_file=INPUT_DATASET, model_save_path=MODEL_PATH):
        self.input_file = input_file
        self.model_save_path = model_save_path
        self.data = None
        self.pipeline = None
        self.feature_columns = None
        self.best_params = None
        
    def load_and_validate_data(self):
        """
        Load data from CSV and perform validation checks
        """
        try:
            # Read the CSV file
            self.data = pd.read_csv(self.input_file)
            
            # Validate required columns
            required_columns = ['crop', 'moisture', 'temp', 'pump']
            missing_columns = [col for col in required_columns if col not in self.data.columns]
            
            if missing_columns:
                raise ValueError(f"Missing required columns: {missing_columns}")
            
            # Check for missing values
            missing_values = self.data.isnull().sum()
            if missing_values.any():
                logging.warning(f"Found missing values:\n{missing_values[missing_values > 0]}")
            
            # Data summary
            logging.info("\nDataset Summary:")
            logging.info(f"Total records: {len(self.data)}")
            logging.info(f"Unique crops: {self.data['crop'].unique()}")
            logging.info(f"Irrigation events (pump=1): {self.data['pump'].sum()}")
            logging.info(f"Class distribution:\n{self.data['pump'].value_counts(normalize=True)}")
            logging.info("\nFeature Statistics:")
            logging.info(f"\nMoisture:\n{self.data['moisture'].describe()}")
            logging.info(f"\nTemperature:\n{self.data['temp'].describe()}")
            
            # Validate ranges and check for outliers
            self._validate_data()
            
            return True
            
        except Exception as e:
            logging.error(f"Error loading data: {str(e)}")
            return False
    
    def _validate_data(self):
        """
        Comprehensive data validation including ranges and outliers
        """
        # Range validation
        ranges = {
            'moisture': (400, 900),
            'temp': (0, 40)
        }
        
        for column, (min_val, max_val) in ranges.items():
            out_of_range = self.data[
                (self.data[column] < min_val) | 
                (self.data[column] > max_val)
            ]
            
            if not out_of_range.empty:
                logging.warning(
                    f"Found {len(out_of_range)} {column} values outside "
                    f"expected range [{min_val}, {max_val}]"
                )
        
        # Outlier detection
        for column in ['moisture', 'temp']:
            mean = self.data[column].mean()
            std = self.data[column].std()
            outliers = self.data[(self.data[column] < mean - 3*std) | 
                               (self.data[column] > mean + 3*std)]
            if len(outliers) > 0:
                logging.warning(f"\nFound {len(outliers)} outliers in {column}")
                logging.warning(outliers)
    
    def prepare_data(self):
        """
        Prepare data with comprehensive feature engineering
        """
        try:
            # 1. Basic normalization
            self.data['moisture_normalized'] = (self.data['moisture'] - 400) / (900 - 400) * 100
            self.data['temp_normalized'] = (self.data['temp'] - self.data['temp'].min()) / \
                                         (self.data['temp'].max() - self.data['temp'].min())
            
            # 2. Create bins
            self.data['moisture_bin'] = pd.qcut(
                self.data['moisture'], 
                q=4,
                labels=['low', 'medium_low', 'medium_high', 'high']
            )
            
            self.data['temp_bin'] = pd.cut(
                self.data['temp'],
                bins=[float('-inf'), 15, 25, float('inf')],
                labels=['cold', 'optimal', 'hot']
            )
            
            # 3. Interaction features
            self.data['moisture_temp_interaction'] = self.data['moisture_normalized'] * \
                                                   self.data['temp_normalized']
            
            # Create dummy variables
            moisture_dummies = pd.get_dummies(self.data['moisture_bin'], prefix='moisture')
            temp_dummies = pd.get_dummies(self.data['temp_bin'], prefix='temp')
            
            # Select features
            numerical_features = [
                'moisture_normalized', 'temp_normalized',
                'moisture', 'temp', 'moisture_temp_interaction'
            ]
            
            # Combine features
            X = pd.concat([
                self.data[numerical_features],
                moisture_dummies,
                temp_dummies
            ], axis=1)
            y = self.data['pump']
            
            self.feature_columns = X.columns
            
            # Train-test split
            return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
            
        except Exception as e:
            logging.error(f"Error in data preparation: {str(e)}")
            return None
    
    def create_pipeline(self):
        """Create robust pipeline with sampling and model"""
        return Pipeline([
            ('scaler', StandardScaler()),
            ('sampler', SMOTE(sampling_strategy=0.8, random_state=42)),
            ('undersampler', RandomUnderSampler(sampling_strategy=0.9, random_state=42)),
            ('classifier', RandomForestClassifier(random_state=42))
        ])
    
    def train_model(self, X_train, y_train):
        """Train model with optimization"""
        try:
            # Create pipeline
            self.pipeline = self.create_pipeline()
            
            # Initial cross-validation
            cv_scores = cross_val_score(self.pipeline, X_train, y_train, cv=5)
            logging.info(f"\nInitial cross-validation scores: {cv_scores}")
            logging.info(f"Mean CV score: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
            
            # Define parameter grid
            param_grid = {
                'classifier__n_estimators': [100, 200],
                'classifier__max_depth': [5, 10, None],
                'classifier__min_samples_split': [5, 10],
                'classifier__min_samples_leaf': [4, 8],
                'classifier__class_weight': ['balanced', 'balanced_subsample']
            }
            
            # Perform grid search
            grid_search = GridSearchCV(
                self.pipeline,
                param_grid,
                cv=5,
                scoring='f1',
                n_jobs=-1,
                verbose=1
            )
            
            grid_search.fit(X_train, y_train)
            
            self.best_params = grid_search.best_params_
            logging.info(f"Best parameters: {self.best_params}")
            
            self.pipeline = grid_search.best_estimator_
            logging.info("Model training completed successfully")
            
            return True
            
        except Exception as e:
            logging.error(f"Error in model training: {str(e)}")
            return False
    
    def evaluate_model(self, X_test, y_test):
        """Comprehensive model evaluation"""
        if self.pipeline is None:
            logging.error("Model has not been trained yet")
            return
        
        try:
            # Get predictions
            y_pred = self.pipeline.predict(X_test)
            y_pred_proba = self.pipeline.predict_proba(X_test)[:, 1]
            
            # Classification report
            print("\nClassification Report:")
            print(classification_report(y_test, y_pred))
            
            # Plot results
            self._plot_evaluation_results(y_test, y_pred, y_pred_proba)
            
            logging.info("Model evaluation completed successfully")
            
        except Exception as e:
            logging.error(f"Error in model evaluation: {str(e)}")
    
    def _plot_evaluation_results(self, y_test, y_pred, y_pred_proba):
        """Generate all evaluation plots"""
        # 1. Confusion Matrix
        plt.figure(figsize=(8, 6))
        cm = confusion_matrix(y_test, y_pred)
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=['No Irrigation', 'Irrigation'],
                   yticklabels=['No Irrigation', 'Irrigation'])
        plt.title('Confusion Matrix')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        save_plot('confusion_matrix', plt.gcf())
        plt.close()
        
        # 2. ROC Curve
        plt.figure(figsize=(8, 6))
        fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
        roc_auc = auc(fpr, tpr)
        plt.plot(fpr, tpr, label=f'ROC curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlim([0, 1])
        plt.ylim([0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve')
        plt.legend(loc="lower right")
        save_plot('roc_curve', plt.gcf())
        plt.close()
        
        # 3. Probability Distribution
        plt.figure(figsize=(10, 6))
        sns.histplot(data=pd.DataFrame({
            'Probability': y_pred_proba,
            'True Class': y_test
        }), x='Probability', hue='True Class', bins=30)
        plt.title('Distribution of Prediction Probabilities')
        save_plot('probability_distribution', plt.gcf())
        plt.close()
    
    def analyze_feature_importance(self):
        """Analyze and visualize feature importance"""
        if self.pipeline is None:
            logging.error("Model has not been trained yet")
            return
        
        try:
            importances = self.pipeline.named_steps['classifier'].feature_importances_
            indices = np.argsort(importances)[::-1]
            
            plt.figure(figsize=(12, 6))
            plt.title("Feature Importances for Irrigation Decision")
            plt.bar(range(len(importances)), importances[indices])
            plt.xticks(range(len(importances)), 
                      [self.feature_columns[i] for i in indices], 
                      rotation=45, ha='right')
            plt.tight_layout()
            save_plot('feature_importance', plt.gcf())
            plt.close()
            
            print("\nTop 10 Most Important Features:")
            for i in indices[:10]:
                print(f"{self.feature_columns[i]}: {importances[i]:.4f}")
            
        except Exception as e:
            logging.error(f"Error in analyzing feature importance: {str(e)}")
    
    def save_model(self):
        """Save the trained pipeline"""
        if self.pipeline is None:
            logging.error("No model to save")
            return
        
        try:
            joblib.dump(self.pipeline, self.model_save_path)
            logging.info(f"Model saved to {self.model_save_path}")
        except Exception as e:
            logging.error(f"Error saving model: {str(e)}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <input_csv_file>")
        sys.exit(1)
    
    # Initialize pipeline
    pipeline = IrrigationMLPipeline(sys.argv[1])
    
    # Load and validate data
    if not pipeline.load_and_validate_data():
        sys.exit(1)
    
    # Prepare data
    split_data = pipeline.prepare_data()
    if split_data is None:
        sys.exit(1)
    X_train, X_test, y_train, y_test = split_data
    
    # Train model
    if not pipeline.train_model(X_train, y_train):
        sys.exit(1)
    
    # Evaluate model
    pipeline.evaluate_model(X_test, y_test)
    
    # Analyze feature importance
    pipeline.analyze_feature_importance()
    
    # Save model
    pipeline.save_model()

if __name__ == "__main__":
    main()
