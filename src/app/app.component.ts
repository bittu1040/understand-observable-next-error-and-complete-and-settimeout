import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  name = 'Angular ' + VERSION.major;

  data!: Observable<number>;
  myArray: number[] = [];
  errors!: boolean;
  finished!: boolean;
  fetchData(): void {
    this.data = new Observable((observer) => {
      setTimeout(() => {  observer.next(11)    }, 1000),
      setTimeout(() => {  observer.next(22)    }, 1000),
      setTimeout(() => {  observer.error(22)   }, 2000),
      setTimeout(() => {  observer.complete()  }, 1000);
    });

    this.data.subscribe({
      next: (value) => {
        this.myArray.push(value);
      },
      error: () => {
        this.errors = true;
      },
      complete: () => {
        this.finished = true;
      },
    });
  }

  fetchDatafromAPI() {
    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
