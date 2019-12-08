import { NgModule } from "@angular/core";
import { AuthGuard } from "./services/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { ReportesComponent } from "./components/reportes/reportes.component";
import { LandingComponent } from "./components/landing/landing.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ConfigComponent } from "./components/config/config.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  {
    path: "inicio",
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reportes",
    component: ReportesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "config",
    component: ConfigComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
