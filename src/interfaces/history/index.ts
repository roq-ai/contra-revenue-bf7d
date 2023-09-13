import { ArticleInterface } from 'interfaces/article';
import { GetQueryInterface } from 'interfaces';

export interface HistoryInterface {
  id?: string;
  article_id: string;
  change_log: string;
  created_at?: any;
  updated_at?: any;

  article?: ArticleInterface;
  _count?: {};
}

export interface HistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  article_id?: string;
  change_log?: string;
}
