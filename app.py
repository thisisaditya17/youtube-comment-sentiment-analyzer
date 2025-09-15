import re
import pandas as pd
from googleapiclient.discovery import build
from dotenv import load_dotenv
import pandas as pd
import joblib
import xgboost as xgb
import spacy
import os
import flask
import flask_cors

#load models and env variables
load_dotenv()
model = xgb.XGBClassifier()
API_KEY = os.getenv("GOOGLE_API_KEY")
youtube = build("youtube", "v3", developerKey=API_KEY)
nlp = spacy.load("en_core_web_sm")
vectorizer = joblib.load("tfidf_vectorizer.joblib")
model.load_model("review_sentiment_model.json")

#functions
def remove_html_tags(text):
    clean_text = re.sub(r'<.*?>', '', text)
    return clean_text

def preprocess_text(doc):
    tokens = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.is_space]
    return ' '.join(tokens)

def get_all_comments(video_id):
    comments = []
    request = youtube.commentThreads().list(
        part="snippet,replies",
        videoId=video_id,
        textFormat="plainText",
        maxResults=1000  
    )
    while request:
        response = request.execute()
        for item in response.get("items", []):
            snippet = item["snippet"]["topLevelComment"]["snippet"]
            comments.append({
                "author": snippet.get("authorDisplayName"),
                "text": snippet.get("textDisplay"),
                "isReply": False
            })
        request = youtube.commentThreads().list_next(request, response)
    return comments

def extract_video_id(youtube_link):
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(pattern, youtube_link)
    return match.group(1) if match else None


# Main execution
app = flask.Flask(__name__)
flask_cors.CORS(app)
@app.route('/analyze', methods=['GET'])  
def analyze_comments():
    youtube_video_link = flask.request.args.get('youtube_link')
    if not youtube_video_link:
        return flask.jsonify({"error": "youtube_link is required"}), 400
    
    video_id = extract_video_id(youtube_video_link)

    comments = get_all_comments(video_id)
    df = pd.DataFrame(comments)

    df['cleaned_text'] = df['text'].apply(remove_html_tags) 
    docs = list(nlp.pipe(df['cleaned_text']))
    df['processed_text'] = [preprocess_text(doc) for doc in docs]

    youtube_features = vectorizer.transform(df['processed_text'])

    predictions = model.predict(youtube_features)
    probabilities = model.predict_proba(youtube_features)

    df['sentiment'] = predictions 
    df['sentiment_label'] = df['sentiment'].map({0: 'negative', 1: 'positive'})
    df['confidence'] = probabilities.max(axis=1) 

    sentiment_counts = df['sentiment_label'].value_counts()

    positive_count = sentiment_counts.get('positive', 0)
    negative_count = sentiment_counts.get('negative', 0)

    positive_comments = df[
        (df['sentiment_label'] == 'positive') & 
        (df['confidence'] > 0.8)
    ].nlargest(5, 'confidence')

    negative_comments = df[
        (df['sentiment_label'] == 'negative') & 
        (df['confidence'] > 0.8)
    ].nlargest(5, 'confidence')

    top_5_positive = positive_comments[['author', 'text', 'confidence']].to_dict(orient='records')
    top_5_negative = negative_comments[['author', 'text', 'confidence']].to_dict(orient='records')

    response = {
        "total_comments": len(df),
        "positive_comments": int((df['sentiment_label'] == 'positive').sum()),
        "negative_comments": int((df['sentiment_label'] == 'negative').sum()),
        "sentiment_percentages": {
        "positive": round((positive_count / len(df)) * 100, 1),
        "negative": round((negative_count / len(df)) * 100, 1)
        },
        "top_5_positive_comments": top_5_positive,
        "top_5_negative_comments": top_5_negative
    }

    return flask.jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

