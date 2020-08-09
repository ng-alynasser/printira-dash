import { NgModule } from '@angular/core';
import { LayoutModule } from './layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';

const MODULES = [
  DashboardRoutingModule,
  LayoutModule,
  NbMenuModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
