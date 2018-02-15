import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IscrittiPage } from './iscritti';

@NgModule({
  declarations: [
    IscrittiPage,
  ],
  imports: [
    IonicPageModule.forChild(IscrittiPage),
  ],
})
export class IscrittiPageModule {}
