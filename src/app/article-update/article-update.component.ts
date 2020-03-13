import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from "@angular/forms";
import { Article } from './../model/Article';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  articleData: Article[];
  imagePreview: string;
  
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getArticle(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', []]
    })
  }

// Get to access form control
get myForm() {
  return this.editForm.controls;
}

onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.editForm.patchValue({ image: file });
  this.editForm.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
  console.log(this.editForm);
}

getArticle(id) {
  this.apiService.getArticleById(id).subscribe(data => {
    this.editForm.controls['title'].setValue(data['title']);
    this.editForm.controls['description'].setValue(data['description']);
  });
}

onSubmit() {
  this.submitted = true;
  if (!this.editForm.valid) {
    return false;
  } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.apiService.updateArticle(id, this.editForm.value)
        .subscribe(res => {
          console.log('Content updated successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/articleList'))
        }, (error) => {
          console.log(error)
        })
  }
}
}
