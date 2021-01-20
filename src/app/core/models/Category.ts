import { Post } from 'src/app/core/models/Post';
/**
 * Category model.
 */
export class Category {
  /**
   * Category Id
   * @param Id number
   * Category Name
   * @param Name string
   * Category Posts ids
   * @param PostIds number[]
   * Category Posts
   * @param Posts Post[]
   */
  constructor (
    public Id: number,
    public Name: string,
    public PostIds?: number[],
    public Posts?: Post[],
  ) {}
}
