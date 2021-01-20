import { Categories } from './../../data/CategoriesList';
import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  /**
   * @param categoryChanged EventEmitter<boolean>
   */
  categoryChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @param _categories Category[]
   */
  private _categories: Category[] = Categories;

  /**
   * @param _postsService PostsService
   */
  constructor(
    private _postsService: PostsService,
  ) { }

  /**
   * Get categories.
   * @param search string
   * @param searchFilter string[]
   * @returns Category[]
   */
  public getCategories(search: string = null): Category[] {
    let categories = [];
    this._categories.forEach(category => {
      category.Posts = [];
      if (category.PostIds !== undefined) {
        category.PostIds.forEach(x => {
          if (!category.Posts.includes(this._postsService.getPost(x))) {
            category.Posts.push(this._postsService.getPost(x));
          }
        });
      }
      categories.push(category);
    });

    if (search !== null) {
      categories = categories.filter(category => category.Name.includes(search));
    }

    return categories;
  }
}
