import { User } from './User';

/**
 * Post model.
 */
export class Post {
  /*
  //access -> string
  */
  /**
   * Post Id
   * @param Id number
   * Post Title
   * @param Title string
   * Post Description
   * @param Description string
   * Post Content
   * @param Content string
   * Post Author Id
   * @param AuthorId number
   * Post Author
   * @param Author User
   * Post Seen
   * @param Seen number
   * Post Likes
   * @param Likes number
   * Post Dislikes
   * @param Dislikes number
   * Post Image Url
   * @param ImageUrl string
   * Post Tags
   * @param Tags string
   * Post Tags List
   * @param TagsList string
   * Post Comments Count
   * @param CommentsCount number
   */
  constructor (
    public Id: number,
    public Title: string,
    public Description: string,
    public Content: string,
    public AuthorId: number,
    public Author: User,
    public Seen: number,
    public Likes: number,
    public Dislikes: number,
    public ImageUrl: string,
    public Tags: string,
    public CommentsCount: number,
    public TagsList?: string[],
  ) {}
}
