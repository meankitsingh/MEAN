import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ArticleCreateComponent } from '../article-create/article-create.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleUpdateComponent } from '../article-update/article-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'article',
    component: ArticleCreateComponent
  },
  {
    path: 'articleList',
    component: ArticleListComponent
  },
  {
    path: 'articleUpdate/:id',
    component: ArticleUpdateComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
