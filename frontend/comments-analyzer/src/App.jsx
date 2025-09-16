import { useState } from 'react';
import InputForm from './InputForm';
import SentimentChart from './SentimentChart';
import { analyzeComments } from './api';
import LimitationsNotice from './LimitationsNotice';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (youtubeUrl) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeComments(youtubeUrl);
      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-2">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-3xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 drop-shadow-lg">
          YouTube Sentiment Analysis
        </h1>
        
        <div className="flex flex-col items-center mb-8">
          <InputForm onAnalyze={handleAnalyze} loading={loading} />
        </div>

         <LimitationsNotice />
        
        {error && (
          <div className="bg-red-200 border border-red-400 text-red-800 px-6 py-4 rounded-xl mb-6 text-lg font-medium shadow">
            {error}
          </div>
        )}
        
        {analysisData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-green-100 to-blue-50 p-8 rounded-2xl shadow-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-6 text-green-700 tracking-wide">Sentiment Distribution</h2>
              <SentimentChart 
                positiveCount={analysisData.positive_comments}
                negativeCount={analysisData.negative_comments}
              />
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-pink-50 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-pink-700 tracking-wide">Summary</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <span className="font-semibold text-gray-700">Total Comments:</span> 
                  <span className="ml-2 text-blue-700">{analysisData.total_comments}</span>
                </p>
                <p>
                  <span className="font-semibold text-green-700">Positive:</span> 
                  <span className="ml-2">{analysisData.sentiment_percentages.positive}%</span>
                </p>
                <p>
                  <span className="font-semibold text-red-700">Negative:</span> 
                  <span className="ml-2">{analysisData.sentiment_percentages.negative}%</span>
                </p>
              </div>
            </div>

            {/* Top Comments Section */}
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-100 p-8 rounded-2xl shadow-lg lg:col-span-2 mt-6">
              <h2 className="text-2xl font-bold mb-8 text-center text-purple-700 tracking-wide">Top Comments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
                    Top Positive Comments
                  </h3>
                  <div className="space-y-4">
                    {analysisData.top_5_positive_comments && analysisData.top_5_positive_comments.length > 0 ? (
                      analysisData.top_5_positive_comments.map((comment, idx) => (
                        <div key={idx} className="border-l-8 border-green-400 pl-5 py-3 bg-green-50/80 rounded-lg shadow">
                          <p className="text-base text-green-900 mb-1 font-medium">
                            <span className="font-bold">{comment.author}</span>
                            <span className="ml-2 text-xs bg-green-200 px-2 py-0.5 rounded-full">
                              Confidence: {(comment.confidence * 100).toFixed(1)}%
                            </span>
                          </p>
                          <p className="text-gray-700 italic">"{comment.text}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No positive comments found.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-red-400 rounded-full"></span>
                    Top Negative Comments
                  </h3>
                  <div className="space-y-4">
                    {analysisData.top_5_negative_comments && analysisData.top_5_negative_comments.length > 0 ? (
                      analysisData.top_5_negative_comments.map((comment, idx) => (
                        <div key={idx} className="border-l-8 border-red-400 pl-5 py-3 bg-red-50/80 rounded-lg shadow">
                          <p className="text-base text-red-900 mb-1 font-medium">
                            <span className="font-bold">{comment.author}</span>
                            <span className="ml-2 text-xs bg-red-200 px-2 py-0.5 rounded-full">
                              Confidence: {(comment.confidence * 100).toFixed(1)}%
                            </span>
                          </p>
                          <p className="text-gray-700 italic">"{comment.text}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No negative comments found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
