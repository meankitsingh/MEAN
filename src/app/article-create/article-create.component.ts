import { Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  submitted = false;
  imagePreview: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {}


  ngOnInit() {
  }

      articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, {})
  })
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.articleForm.patchValue({ image: file });
    this.articleForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
    console.log(this.articleForm);
  }

  get title(): any { return this.articleForm.get('title'); }
  get description(): any { return this.articleForm.get('description'); }
  
    onSubmit() {
      let {
        title,
        description,
        image
      } = this.articleForm.getRawValue();
      this.submitted = true;
      if (!this.articleForm.valid) {
        return false;
      } else {
        this.apiService.createArticle(title,description,image).subscribe(
          (res) => {
            console.log('Article successfully created!')
            this.ngZone.run(() => this.router.navigateByUrl('/articleList'))
          }, (error) => {
            console.log(error);
          });
      }
    }
}
