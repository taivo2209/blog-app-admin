import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  posts: Array<object> = [];
  postArray: any = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getData().subscribe((val) => {
      this.posts = val;
      // console.log(val);
      this.postArray = this.posts;
    });
  }

  onDelete(postImgPath: any, id: string) {
    this.postService.deleteImg(postImgPath, id);
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };

    this.postService.markedFeatured(id, featuredData);
  }
}
