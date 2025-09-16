import { useState } from 'react';

const LimitationsNotice = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-medium text-blue-800 mb-1">
              Analysis Scope & Limitations
            </h3>
            <p className="text-blue-700 text-sm">
              This analyzer provides insights based on the most recent comments available.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          <svg 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pl-8 space-y-2 text-sm text-blue-700">
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span><strong>Sample Size:</strong> Analyzes up to 1,000 most recent top-level comments</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span><strong>Comment Focus:</strong> Main comments only (replies excluded for focused analysis)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span><strong>Language:</strong> Optimized for English comments with standard text</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium mr-2">•</span>
            <span><strong>Content Type:</strong> Works best with substantial comments (3+ words)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LimitationsNotice;
