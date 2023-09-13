import axios from 'axios';
import queryString from 'query-string';
import { ArticleKeywordInterface, ArticleKeywordGetQueryInterface } from 'interfaces/article-keyword';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getArticleKeywords = async (
  query?: ArticleKeywordGetQueryInterface,
): Promise<PaginatedInterface<ArticleKeywordInterface>> => {
  const response = await axios.get('/api/article-keywords', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createArticleKeyword = async (articleKeyword: ArticleKeywordInterface) => {
  const response = await axios.post('/api/article-keywords', articleKeyword);
  return response.data;
};

export const updateArticleKeywordById = async (id: string, articleKeyword: ArticleKeywordInterface) => {
  const response = await axios.put(`/api/article-keywords/${id}`, articleKeyword);
  return response.data;
};

export const getArticleKeywordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/article-keywords/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteArticleKeywordById = async (id: string) => {
  const response = await axios.delete(`/api/article-keywords/${id}`);
  return response.data;
};
