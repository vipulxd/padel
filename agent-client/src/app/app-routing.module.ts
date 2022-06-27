import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: 'map',
  loadChildren : ()=> import('./modules/usermap/usermap.module').then(m => m.UsermapModule)
},
{
  path : 'profile',
  loadChildren : ()=> import('./modules/userprofile/userprofile.module').then(m=> m.UserprofileModule)
}
  ,  {
    path : '',
    redirectTo: 'map',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
