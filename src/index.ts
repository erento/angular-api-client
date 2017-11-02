import {NgModule} from '@angular/core';
import {ApiClient} from './apiClient';
import {UrlBuilder} from './url.builder';
import {HttpClientModule} from '@angular/common/http';

export * from './apiBaseCommand';
export * from './apiClient';

@NgModule({
    imports: [HttpClientModule],
    providers: [ApiClient, UrlBuilder],
})
export class ApiClientModule {}
