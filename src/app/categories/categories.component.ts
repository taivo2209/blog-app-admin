import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  newCategory: string = '';
  categoryId: string = '';
  submitted = false;
  categories: Array<object> = [];
  categoryArray: any = [];
  formStatus: string = 'Add';

  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.categories = val;
      // console.log(val);
      this.categoryArray = this.categories;
    });
  }

  onSubmit(formData: NgForm) {
    this.submitted = true; // Đánh dấu là đã submit

    if (formData.valid) {
      // Kiểm tra tính hợp lệ của form
      let categoryData: Category = {
        category: formData.value.category,
      };
      if (this.formStatus == 'Add') {
        this.categoryService.saveData(categoryData);
        // formData.reset();
      } else if (this.formStatus == 'Edit') {
        this.categoryService.updateData(this.categoryId, categoryData);
        // formData.reset();
        this.formStatus = 'Add';
      }
    }
  }

  onEdit(category: string, id: string) {
    this.newCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
