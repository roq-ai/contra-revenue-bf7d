import { ArticleKeywordInterface } from 'interfaces/article-keyword';
import { GetQueryInterface } from 'interfaces';

export interface KeywordInterface {
  id?: string;
  word: string;
  created_at?: any;
  updated_at?: any;
  article_keyword?: ArticleKeywordInterface[];

  _count?: {
    article_keyword?: number;
  };
}

export interface KeywordGetQueryInterface extends GetQueryInterface {
  id?: string;
  word?: string;
}
