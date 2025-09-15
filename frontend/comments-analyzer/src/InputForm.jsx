import { useState } from 'react';

const InputForm = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (inputUrl) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
    return youtubeRegex.test(inputUrl);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    if (!validateUrl(trimmedUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onAnalyze(trimmedUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          {/* Main input container */}
          <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200 focus-within:border-blue-500 focus-within:shadow-xl transition-all duration-300">
            {/* YouTube icon */}
            <div className="pl-4 pr-3 py-3">
              <svg 
                className="w-6 h-6 text-red-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            
            {/* Input field */}
            <input
              type="url"
              value={url}
              onChange={handleInputChange}
              placeholder="Paste your YouTube video URL here..."
              className={`flex-1 px-3 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400 ${
                error ? 'text-red-600' : 'text-gray-700'
              }`}
              disabled={loading}
            />
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className={`m-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                loading || !url.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Analyze</span>
                </div>
              )}
            </button>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="absolute left-0 top-full mt-2 flex items-center space-x-2 text-red-500 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
        
        {/* Helper text */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            Supports YouTube video links (youtube.com or youtu.be)
          </p>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
