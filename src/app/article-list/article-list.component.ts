import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  Article:any = [];

  constructor(private apiService: ApiService) { 
    this.readArticle();
  }

  ngOnInit() {
  }
  readArticle(){
    this.apiService.getArticle().subscribe((data) => {
     this.Article = data;
    })    
  }

  removeArticle(article, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteArticle(article._id).subscribe((data) => {
          this.Article.splice(index, 1);
        }
      )    
    }
  }
}
