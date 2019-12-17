import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

// Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CavacunaComponent } from './components/shared/cavacuna/cavacuna.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginbarComponent } from './components/shared/loginbar/loginbar.component';
import { ConfigComponent } from './components/config/config.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DevicesComponent } from './components/admin/devices/devices.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReportesComponent,
    NavbarComponent,
    CavacunaComponent,
    LandingComponent,
    LoginbarComponent,
    ConfigComponent,
    AdminComponent,
    UsersComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
