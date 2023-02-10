import { CategoriesService } from './../../../core/services/posts-services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  /**
   * @param categories Category[]
   */
  categories: Category[] = [];

  /**
   * @param _categoriesService CategoriesService
   */
  constructor(private _categoriesService: CategoriesService) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._getCategories();

    this._categoriesService.categoryChanged.subscribe(
      () => {
        this._getCategories();
      }
    );
  }

  /**
   * Get all categories.
   */
  private _getCategories(): void {
    this.categories = this._categoriesService.getCategories(null);
  }
}
