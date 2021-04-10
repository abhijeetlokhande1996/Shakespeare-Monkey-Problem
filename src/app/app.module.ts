import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MonkeyProblemComponent } from './monkey-problem/monkey-problem.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MonkeyProblemComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
