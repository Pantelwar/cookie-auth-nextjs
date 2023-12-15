export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export enum Sort {
  TITLE = 'title',
  BODY = 'body',
  ID = 'id',
}

export type GetPostsRequest = {
  userId?: string;
  _limit?: string;
  _page?: string;
  _sort?: Sort;
  _order?: 'asc' | 'desc';
  q?: string;
};

export type GetPostsResponse = Post[];
