import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent, LayoutComponent, LoaderComponent, MenuComponent } from '@components/index';
import { Configuration } from '@config/index';
import { LoaderInterceptor } from '@interceptors/index';
import { LoaderService } from '@services/index';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    MenuComponent,
    LayoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    Configuration,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
