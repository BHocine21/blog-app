export interface UserCredentials {
  email: string,
  password: string,
}

export interface Article {
  id: number,
  title: string,
  content: string,
  author: string,
  authorId: string,
  publishedDate: string,
  img: string,
}
