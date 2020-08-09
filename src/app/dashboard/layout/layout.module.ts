import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule, NbThemeModule,
  NbUserModule,
  NbSidebarService,
  NbMenuService,
} from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { OneColumnLayoutComponent } from './one-column/one-column.layout';
import { TwoColumnLayoutComponent } from './two-column/two-column.layout';
import { ThreeColumnLayoutComponent } from './three-column/three-column.layout';
import { CORPORATE_THEME } from '../../../assets/scss/theme.corporate';
import { LayoutService } from './services/layout.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const PROVIDERS = [
  NbSidebarService,
  LayoutService,
  NbMenuService,
];

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  MatProgressSpinnerModule,
];


const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent,
  TwoColumnLayoutComponent,
  ThreeColumnLayoutComponent,
  SplashScreenComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...NB_MODULES,
  ],
  exports: [
    CommonModule,
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [
        ...PROVIDERS,
        ...NbThemeModule.forRoot(
          {
            name: 'corporate',
          },
          [ CORPORATE_THEME ],
        ).providers,
      ]
    };
  }
}
