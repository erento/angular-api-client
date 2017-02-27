import {NgModule} from '@angular/core';
import {ApiClient} from './apiClient';
import {UrlBuilder} from './url.builder';
import {UrlSearchParamsBuilder} from './url-search-params.builder';

export * from './apiBaseCommand';
export * from './apiClient';

@NgModule({
    providers: [ApiClient, UrlBuilder, UrlSearchParamsBuilder]
})
export class ApiClientModule {}
