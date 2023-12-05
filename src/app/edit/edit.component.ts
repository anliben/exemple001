import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  nome: string = '';
  id: number = 0;
  url: string = 'http://localhost:3000/profile'

  constructor(
    private routeActivated: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.routeActivated.params.forEach((res: any) => {
      console.log(res)
      this.id = res.id
    })

    this.getProfile()
  }

  edit() {
    this.http.put(`${this.url}/${this.id}`, {
      nome: this.nome
    }).subscribe((res) => {
      this.router.navigate(['/'])
      
    })
  }

  getProfile() {
    this.http.get<Array<any>>(`${this.url}/${this.id}`).subscribe((res: any) => {
      this.nome = res.nome;
    }, (error: any) => {
      console.log(error)
    })
  }
}
