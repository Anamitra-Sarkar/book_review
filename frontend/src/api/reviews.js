import axiosInstance from './axios';

export const addReview = async (bookId, reviewData) => {
  const response = await axiosInstance.post(`/reviews/${bookId}`, reviewData);
  return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}`);
  return response.data;
};

