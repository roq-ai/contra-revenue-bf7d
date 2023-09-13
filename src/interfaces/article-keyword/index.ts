import { ArticleInterface } from 'interfaces/article';
import { KeywordInterface } from 'interfaces/keyword';
import { GetQueryInterface } from 'interfaces';

export interface ArticleKeywordInterface {
  id?: string;
  article_id: string;
  keyword_id: string;
  created_at?: any;
  updated_at?: any;

  article?: ArticleInterface;
  keyword?: KeywordInterface;
  _count?: {};
}

export interface ArticleKeywordGetQueryInterface extends GetQueryInterface {
  id?: string;
  article_id?: string;
  keyword_id?: string;
}
