import {NgModule} from '@angular/core';
import {ApiClient} from './apiClient';

export * from './apiBaseCommand';
export * from './apiClient';

@NgModule({
    providers: [ApiClient]
})
export class ApiClientModule {}
