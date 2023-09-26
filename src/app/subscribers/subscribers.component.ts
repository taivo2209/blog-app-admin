import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscriberArray: Array<any> = [];

  constructor(private subService: SubscribersService) {}

  ngOnInit(): void {
    this.subService.getData().subscribe((val) => {
      console.log(val);
      
      this.subscriberArray = val;
    });
  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }
}
