import axios from 'axios';
import queryString from 'query-string';
import { HistoryInterface, HistoryGetQueryInterface } from 'interfaces/history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHistories = async (query?: HistoryGetQueryInterface): Promise<PaginatedInterface<HistoryInterface>> => {
  const response = await axios.get('/api/histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHistory = async (history: HistoryInterface) => {
  const response = await axios.post('/api/histories', history);
  return response.data;
};

export const updateHistoryById = async (id: string, history: HistoryInterface) => {
  const response = await axios.put(`/api/histories/${id}`, history);
  return response.data;
};

export const getHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/histories/${id}`);
  return response.data;
};
