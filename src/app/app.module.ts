import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbSidebarModule,
  NbDatepickerModule,
  NbToastrModule,
  NbMenuModule,
  NbDialogModule,
} from "@nebular/theme";
import { LayoutModule } from "./dashboard/layout";
import { MomentModule } from "ngx-moment";
import { CKEditorModule } from "ng2-ckeditor";
import { CoreModule } from "./core/core.module";
import { MatNativeDateModule } from "@angular/material";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    LayoutModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    CKEditorModule,
    MomentModule.forRoot(),
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
