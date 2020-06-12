import { Post } from './Post';
import { User } from './User';

/**
 * Comment model.
 */
export class Comment {
  /**
   * Post Comment Id
   * @param Id number
   * Post Comment PostId
   * @param PostId number
   * Post Comment Post
   * @param Post Post
   * Post Comment AuthorId
   * @param AuthorId number
   * Post Comment User
   * @param Author User
   * Post Comment Email
   * @param Email string
   * Post Comment string
   * @param Name string
   * Post Comment Content
   * @param Content string
   * Post Comment Created At
   * @param CreatedAt Date
   */
  constructor(
    public Id: number = 0,
    public PostId?: number,
    public Post?: Post,
    public AuthorId?: number,
    public Author?: User,
    public Email?: string,
    public Name?: string,
    public Content: string = '',
    public CreatedAt?: Date
  ) {}
}
