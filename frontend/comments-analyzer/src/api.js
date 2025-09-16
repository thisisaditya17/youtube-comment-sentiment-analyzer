import axios from 'axios';

const API_BASE_URL = 'https://youtube-comment-sentiment-analyzer-ybe5.onrender.com';

export const analyzeComments = async (youtubeLink) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analyze`, {
      params: { youtube_link: youtubeLink }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to analyze comments');
  }
};

