// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TaskComponent } from './app/task/task.component';
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(TaskComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
}).catch( err=> console.error( err ) )