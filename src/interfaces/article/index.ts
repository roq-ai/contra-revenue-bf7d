import { ArticleKeywordInterface } from 'interfaces/article-keyword';
import { HistoryInterface } from 'interfaces/history';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  category: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  article_keyword?: ArticleKeywordInterface[];
  history?: HistoryInterface[];
  organization?: OrganizationInterface;
  _count?: {
    article_keyword?: number;
    history?: number;
  };
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  category?: string;
  organization_id?: string;
}
