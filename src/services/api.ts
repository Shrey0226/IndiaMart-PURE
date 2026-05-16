import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchSellerDetails = async (glUserId: string) => {
  const response = await api.get(`/seller/${glUserId}`);
  return response.data;
};

export const analyzeSeller = async (data: {
  seller: any;
  ticketsAgainst: any[];
  ticketsBy: any[];
  mcats: any[];
}) => {
  const response = await api.post('/analyze', data);
  return response.data;
};
