import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'exemple001';
  nome: string = '';
  url: string = 'http://localhost:3000/profile'
  items: Array<any> = []

  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.getProfile()
  }

  create() {
    this.http.post(this.url, {
      nome: this.nome
    }).subscribe((res: any) => {
      console.log(res)
      this.getProfile()
    })

  }

  delete(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe(res => {
      console.log(res)
      this.getProfile()
    })
  }
  
  getProfile() {
    this.http.get<Array<any>>(this.url).subscribe((res: Array<any>) => {
      this.items = res;
    })
  }

  edit(item: any) {
    this.router.navigate([`/edit/${item.id}/${item.nome}`])
  }
}
