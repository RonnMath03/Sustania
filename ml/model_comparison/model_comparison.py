import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
import seaborn as sns
import logging
from time import time

class ModelComparisonPipeline:
    def __init__(self):
        self.models = {
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
            'SVM': SVC(probability=True, random_state=42),
            'Logistic Regression': LogisticRegression(random_state=42),
            'Decision Tree': DecisionTreeClassifier(random_state=42)
        }
        self.results = {}
        self.best_model = None
        self.best_model_name = None
        
    def prepare_data(self, input_file):
        """Load and prepare data for model comparison"""
        # Load data
        data = pd.read_csv(input_file)
        
        # Feature engineering
        # 1. Normalize moisture
        data['moisture_normalized'] = (data['moisture'] - 400) / (900 - 400) * 100
        
        # 2. Create temperature ranges (but don't convert to categories yet)
        conditions = [
            (data['temp'] <= 15),
            (data['temp'] <= 25) & (data['temp'] > 15),
            (data['temp'] > 25)
        ]
        values = [0, 1, 2]  # Numeric values instead of strings
        data['temp_range'] = np.select(conditions, values, default=1)
        
        # Create dummy variables for temperature ranges
        temp_dummies = pd.get_dummies(data['temp_range'], prefix='temp_range')
        
        # Select features
        numerical_features = ['moisture_normalized', 'temp']
        
        # Combine all features
        X = pd.concat([
            data[numerical_features],
            temp_dummies
        ], axis=1)
        
        y = data['pump']
        
        # Get feature names for later use
        feature_columns = X.columns.tolist()
        
        # Split into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale only numerical features
        scaler = StandardScaler()
        X_train_scaled = X_train.copy()
        X_test_scaled = X_test.copy()
        
        # Scale numerical features
        X_train_scaled[numerical_features] = scaler.fit_transform(X_train[numerical_features])
        X_test_scaled[numerical_features] = scaler.transform(X_test[numerical_features])
        
        return X_train_scaled, X_test_scaled, y_train, y_test, feature_columns
    
    def train_and_evaluate(self, X_train, X_test, y_train, y_test):
        """Train and evaluate all models"""
        for name, model in self.models.items():
            print(f"\nTraining {name}...")
            start_time = time()
            
            # Train model
            model.fit(X_train, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test)
            y_pred_proba = model.predict_proba(X_test)[:, 1]
            
            # Calculate metrics
            train_time = time() - start_time
            cv_scores = cross_val_score(model, X_train, y_train, cv=5)
            
            # Store results
            self.results[name] = {
                'model': model,
                'predictions': y_pred,
                'probabilities': y_pred_proba,
                'train_time': train_time,
                'cv_scores': cv_scores,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std()
            }
            
            print(f"Training time: {train_time:.2f} seconds")
            print(f"Cross-validation accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
            print("\nClassification Report:")
            print(classification_report(y_test, y_pred))
    
    def plot_roc_curves(self, X_test, y_test):
        """Plot ROC curves for all models"""
        plt.figure(figsize=(10, 6))
        
        for name, results in self.results.items():
            y_pred_proba = results['probabilities']
            fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
            roc_auc = auc(fpr, tpr)
            
            plt.plot(fpr, tpr, label=f'{name} (AUC = {roc_auc:.2f})')
        
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curves for Different Models')
        plt.legend(loc="lower right")
        plt.show()
    
    def plot_comparison_metrics(self):
        """Plot comparison of model metrics"""
        # Prepare data for plotting
        cv_means = [results['cv_mean'] for results in self.results.values()]
        cv_stds = [results['cv_std'] for results in self.results.values()]
        train_times = [results['train_time'] for results in self.results.values()]
        
        # Plot CV scores
        plt.figure(figsize=(12, 5))
        
        plt.subplot(1, 2, 1)
        bars = plt.bar(self.results.keys(), cv_means, yerr=cv_stds)
        plt.title('Cross-Validation Accuracy by Model')
        plt.xticks(rotation=45)
        plt.ylabel('Accuracy')
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.4f}',
                    ha='center', va='bottom')
        
        # Plot training times
        plt.subplot(1, 2, 2)
        bars = plt.bar(self.results.keys(), train_times)
        plt.title('Training Time by Model')
        plt.xticks(rotation=45)
        plt.ylabel('Time (seconds)')
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.2f}s',
                    ha='center', va='bottom')
        
        plt.tight_layout()
        plt.show()
    
    def select_best_model(self):
        """Select the best performing model based on cross-validation scores"""
        cv_means = {name: results['cv_mean'] 
                   for name, results in self.results.items()}
        
        self.best_model_name = max(cv_means, key=cv_means.get)
        self.best_model = self.results[self.best_model_name]['model']
        
        print(f"\nBest performing model: {self.best_model_name}")
        print(f"Cross-validation accuracy: {cv_means[self.best_model_name]:.4f}")
        return self.best_model

def main():
    # Initialize pipeline
    pipeline = ModelComparisonPipeline()
    
    # Load and prepare data
    X_train, X_test, y_train, y_test, feature_columns = pipeline.prepare_data('./training/dataset/input_dataset.csv')
    
    # Train and evaluate all models
    pipeline.train_and_evaluate(X_train, X_test, y_train, y_test)
    
    # Plot comparisons
    pipeline.plot_roc_curves(X_test, y_test)
    pipeline.plot_comparison_metrics()
    
    # Select best model
    best_model = pipeline.select_best_model()

if __name__ == "__main__":
    main()
