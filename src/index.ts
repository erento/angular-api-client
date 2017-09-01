import {NgModule} from '@angular/core';
import {ApiClient} from './apiClient';
import {UrlBuilder} from './url.builder';

export * from './apiBaseCommand';
export * from './apiClient';

@NgModule({
    providers: [ApiClient, UrlBuilder]
})
export class ApiClientModule {}
