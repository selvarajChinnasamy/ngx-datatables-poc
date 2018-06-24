import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';


//
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MockServerResultsService } from './mock-server-results-service';
@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [MockServerResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
