# 🎬 YouTube Sentiment Analyzer

A full-stack web application that analyzes sentiment in YouTube video comments using machine learning. Built with React frontend, Flask API backend, and XGBoost classifier trained on IMDB reviews achieving 85% accuracy.

## 🎯 Project Overview

This system extracts YouTube video comments and provides real-time sentiment analysis, helping content creators understand audience reactions. The model processes up to 1,000 comments per video and identifies the most confident positive and negative feedback.

### Key Features
- **Real-time sentiment analysis** of YouTube comments
- **Interactive dashboard** with Chart.js visualizations  
- **Top comment extraction** showing highest-confidence predictions
- **Professional ML pipeline** with SpaCy text preprocessing
- **85% accuracy** on sentiment classification

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- YouTube Data API v3 key
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/youtube-sentiment-analyzer
cd youtube-sentiment-analyzer
```

2. **Backend Setup**
```bash
pip install -r requirements.txt

# Create .env file and add your API key
echo "GOOGLE_API_KEY=your_youtube_api_key_here" > .env

export FLASK_APP=app.py  

flask run
```

3. **Frontend Setup**
```bash
cd frontend  
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- API: http://localhost:5000

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| **Accuracy** | 85.0% |
| **Training Data** | IMDB Movie Reviews (50K reviews) |
| **Features** | 5,000 TF-IDF features |
| **Model Type** | XGBoost Binary Classifier |
| **Text Processing** | SpaCy NLP Pipeline |

### Analysis Scope
- **Comments Analyzed**: Up to 1,000 per video
- **Comment Type**: Top-level comments (focused analysis)
- **Confidence Threshold**: 80% for displayed examples
- **Language**: Optimized for English text

## 🏗️ Architecture

```
│   
├── app.py                    # Flask API server
├── tfidf_vectorizer.joblib   # Saved TF-IDF vectorizer
├── review_sentiment_model.json # XGBoost model
├── requirements.txt          # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React application
│   │   ├── components/          # React components
│   │   └── api.js              # API service layer
│   └── package.json            # Node dependencies
└── README.md
```

### System Components

**Frontend (React)**
- YouTube URL input with validation
- Real-time sentiment visualization  
- Top comments display with confidence scores
- Responsive design with Tailwind CSS
- Loading states and error handling

**Backend (Flask + ML Pipeline)**
- YouTube Data API integration
- SpaCy text preprocessing pipeline
- XGBoost sentiment classification
- TF-IDF feature extraction
- CORS-enabled REST API

**ML Pipeline**
- HTML tag removal and text cleaning
- Tokenization, lemmatization, stop word removal
- TF-IDF vectorization (5,000 features)
- XGBoost binary classification
- Confidence score calculation

## 🔧 API Documentation

### Analyze YouTube Comments

```http
GET /analyze?youtube_link={VIDEO_URL}
```

**Request Parameters:**
- `youtube_link`: Full YouTube video URL (youtube.com or youtu.be)

**Response:**
```json
{
  "total_comments": 847,
  "positive_comments": 521,
  "negative_comments": 326,
  "sentiment_percentages": {
    "positive": 61.5,
    "negative": 38.5
  },
  "top_5_positive_comments": [
    {
      "author": "UserName",
      "text": "This video is absolutely amazing!",
      "confidence": 0.94
    }
  ],
  "top_5_negative_comments": [...]
}
```

## ⚠️ Current Limitations

### **Scope Constraints**
- **Comment Volume**: Limited to 1,000 most recent comments due to API quota constraints
- **Comment Type**: Analyzes top-level comments only (replies excluded for focused analysis)  
- **Language**: Optimized for English text, may struggle with other languages

### **Model Limitations**
- **Domain Gap**: Model trained on formal movie reviews, may have reduced accuracy on informal social media text
- **Emoji Handling**: Limited processing of emojis and special characters
- **Context**: Lacks understanding of video-specific references and sarcasm detection

### **Technical Constraints**
- **Real-time Only**: No caching or historical analysis storage
- **Single Video**: Processes one video at a time
- **API Dependency**: Requires active YouTube Data API key with sufficient quota

## 🛠️ Technologies Used

**Machine Learning**
- XGBoost - Binary sentiment classification
- SpaCy - Natural language processing
- scikit-learn - TF-IDF vectorization and metrics
- pandas/numpy - Data manipulation
- joblib - Model persistence

**Backend**
- Flask - Web framework  
- YouTube Data API v3 - Comment extraction
- Flask-CORS - Cross-origin support
- python-dotenv - Environment management

**Frontend**
- React 18 - UI framework
- Chart.js - Data visualization
- Axios - HTTP client
- Vite - Build tool and dev server
- Tailwind CSS - Styling framework

## 📈 What This Achieves

✅ **End-to-end ML pipeline** from data collection to visualization  
✅ **Real-world API integration** with proper error handling  
✅ **Production-ready architecture** with separated frontend/backend  
✅ **Professional dashboard** showing actionable insights  
✅ **Constraint-driven design** working within API limitations  

## 💡 Future Improvements

- Add support for comment replies analysis
- Implement basic emoji sentiment mapping  
- Add temporal sentiment analysis over time
- Include multiple language support
- Add video comparison features
- Implement comment caching system

## 👨‍💻 Author

**Aditya Joshi**
- GitHub: [@thisisaditya17](https://github.com/thisisaditya17)
- LinkedIn: [thisisaditya17](https://linkedin.com/in/thisisaditya17)

## 🙏 Acknowledgments

- YouTube Data API for comment access
- IMDB dataset for sentiment training data
- SpaCy team for excellent NLP tools
- XGBoost community for ML framework
- React and Flask communities for comprehensive documentation
