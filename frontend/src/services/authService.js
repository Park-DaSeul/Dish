import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // 백엔드 API 주소

// 회원가입
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup API error:', error.response?.data || error.message);
    throw error.response?.data || new Error('An unknown error occurred');
  }
};
