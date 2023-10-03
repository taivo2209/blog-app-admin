import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/image-preview.jpg';
  selectedImg: any;
  categories: Array<object> = [];
  categoryArray: any = [];
  postForm: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (val) => {
      // console.log(val);
      this.docId = await val['id'];
      // console.log(this.docId);

      await this.postService.getOneData(val['id']).then((post) => {
        // console.log(post);

        if (this.docId) {
          this.post = post;
          // console.log(this.post.category.category);
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, [Validators.required]],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: ['', [Validators.required]],
            postImg: ['', [Validators.required]],
            content: [this.post.content, [Validators.required]],
          });
          // console.log(this.post.category.category);

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        }
      });
    });

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.categories = val;
      // console.log(val);
      this.categoryArray = this.categories;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    let permalink = title.replace(/\s/g, '-');
    // console.log('permalink', permalink);
    this.permalink = permalink;
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    // console.log(this.postForm.value);

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: this.postForm.value.category?.id,
        category: this.postForm.value.category?.name,
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    // console.log(postData);

    this.postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/image-preview.jpg';
  }
}
