import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { BaseUrlInterceptor } from './app/services/interceptors/baseurl.interceptor';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
});

addIcons(allIcons);
defineCustomElements(window);
