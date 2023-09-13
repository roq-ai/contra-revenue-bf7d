const mapping: Record<string, string> = {
  articles: 'article',
  'article-keywords': 'article_keyword',
  histories: 'history',
  keywords: 'keyword',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
