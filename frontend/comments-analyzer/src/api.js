import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

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

