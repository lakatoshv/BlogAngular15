import { Category } from './Category';
import { Categories } from './../data/CategoriesList';
import { Tag } from './Tag';
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
   * Post Category Id
   * @param CategoryId number
   * Post Created at
   * @param CreatedAt string
   * Post Tags List
   * @param TagsList Tag[]
   * Post Comments Count
   * @param CommentsCount number
   * Post Tags List Ids
   * @param TagsListIds number[]
   * Post Category
   * @param Category Category
   */
  constructor (
    public Id: number,
    public Title: string,
    public Description: string,
    public Content: string,
    public Author: User | null,
    public Seen: number,
    public Likes: number,
    public Dislikes: number,
    public ImageUrl: string,
    public CategoryId: number,
    public CreatedAt: Date,
    public CommentsCount: number,
    public TagsList?: Tag[] | null,
    public TagsListIds?: number[] | null,
    public Category?: Category,
    public AuthorId?: number | null,
  ) {}
}
