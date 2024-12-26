import pandas as pd
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import logging
from datetime import datetime
import os

# Define base directory and create logs directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)

# Update logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(LOGS_DIR, f'model_testing_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log')),
        logging.StreamHandler()
    ]
)

class ModelTester:
    def __init__(self, model_path=None):
        """Initialize the model tester"""
        self.model_path = model_path or os.path.join(BASE_DIR, 'ml', 'models', 'irrigation_model.joblib')
        self.pipeline = None
        
    def load_model(self):
        """Load the trained model pipeline"""
        try:
            self.pipeline = joblib.load(self.model_path)
            logging.info("Model loaded successfully")
            return True
        except Exception as e:
            logging.error(f"Error loading model: {str(e)}")
            return False
    
    def prepare_test_data(self, test_data):
        """Prepare test data with feature engineering"""
        # Basic normalization
        test_data['moisture_normalized'] = (test_data['moisture'] - 400) / (900 - 400) * 100
        test_data['temp_normalized'] = (test_data['temp'] - test_data['temp'].min()) / \
                                     (test_data['temp'].max() - test_data['temp'].min())
        
        # Create bins
        test_data['moisture_bin'] = pd.qcut(
            test_data['moisture'], 
            q=4,
            labels=['low', 'medium_low', 'medium_high', 'high']
        )
        
        test_data['temp_bin'] = pd.cut(
            test_data['temp'],
            bins=[float('-inf'), 15, 25, float('inf')],
            labels=['cold', 'optimal', 'hot']
        )
        
        # Interaction features
        test_data['moisture_temp_interaction'] = test_data['moisture_normalized'] * \
                                               test_data['temp_normalized']
        
        # Create dummy variables
        moisture_dummies = pd.get_dummies(test_data['moisture_bin'], prefix='moisture')
        temp_dummies = pd.get_dummies(test_data['temp_bin'], prefix='temp')
        
        # Combine features
        numerical_features = [
            'moisture_normalized', 'temp_normalized',
            'moisture', 'temp', 'moisture_temp_interaction'
        ]
        
        X_test = pd.concat([
            test_data[numerical_features],
            moisture_dummies,
            temp_dummies
        ], axis=1)
        
        return X_test, test_data['pump']
    
    def test_model(self, test_data_path):
        """Run complete model testing"""
        if not self.load_model():
            return False
        
        # Load and prepare test data
        test_data = pd.read_csv(test_data_path)
        X_test, y_test = self.prepare_test_data(test_data)
        
        # Make predictions
        predictions = self.pipeline.predict(X_test)
        probabilities = self.pipeline.predict_proba(X_test)[:, 1]
        
        # Log results
        self._log_results(y_test, predictions, probabilities)
        
        # Generate visualizations
        self._plot_results(y_test, predictions, probabilities)
        
        return predictions, probabilities
    
    def _log_results(self, y_test, predictions, probabilities):
        """Log model performance metrics"""
        # Classification report
        report = classification_report(y_test, predictions)
        logging.info("\nClassification Report:")
        logging.info("\n" + report)
        
        # Confusion matrix
        cm = confusion_matrix(y_test, predictions)
        tn, fp, fn, tp = cm.ravel()
        
        metrics = {
            'Accuracy': (tp + tn) / (tp + tn + fp + fn),
            'Precision': tp / (tp + fp) if (tp + fp) > 0 else 0,
            'Recall': tp / (tp + fn) if (tp + fn) > 0 else 0,
            'False Positive Rate': fp / (fp + tn) if (fp + tn) > 0 else 0,
            'False Negative Rate': fn / (fn + tp) if (fn + tp) > 0 else 0
        }
        
        logging.info("\nDetailed Metrics:")
        for metric, value in metrics.items():
            logging.info(f"{metric}: {value:.4f}")
    
    def _plot_results(self, y_test, predictions, probabilities):
        """Generate performance visualization plots"""
        # Update image paths
        confusion_matrix_path = os.path.join(LOGS_DIR, 'confusion_matrix_test.png')
        roc_curve_path = os.path.join(LOGS_DIR, 'roc_curve_test.png')
        prob_dist_path = os.path.join(LOGS_DIR, 'probability_distribution_test.png')
        
        # 1. Confusion Matrix
        plt.figure(figsize=(8, 6))
        cm = confusion_matrix(y_test, predictions)
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=['No Irrigation', 'Irrigation'],
                   yticklabels=['No Irrigation', 'Irrigation'])
        plt.title('Confusion Matrix on Test Data')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.savefig(confusion_matrix_path)
        plt.close()
        
        # 2. ROC Curve
        plt.figure(figsize=(8, 6))
        fpr, tpr, _ = roc_curve(y_test, probabilities)
        roc_auc = auc(fpr, tpr)
        plt.plot(fpr, tpr, label=f'ROC curve (AUC = {roc_auc:.2f})')
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve on Test Data')
        plt.legend(loc="lower right")
        plt.savefig(roc_curve_path)
        plt.close()
        
        # 3. Probability Distribution
        plt.figure(figsize=(10, 6))
        sns.histplot(data=pd.DataFrame({
            'Probability': probabilities,
            'True Class': y_test
        }), x='Probability', hue='True Class', bins=30)
        plt.title('Distribution of Prediction Probabilities')
        plt.savefig(prob_dist_path)
        plt.close()

def main():
    # Initialize tester
    tester = ModelTester()
    
    # Update test dataset path
    test_data_path = os.path.join(BASE_DIR, 'ml', 'training', 'dataset', 'test_dataset.csv')
    
    # Run tests
    predictions, probabilities = tester.test_model(test_data_path)

if __name__ == "__main__":
    main()