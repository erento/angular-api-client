import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApiClient} from './api.client';
import {UrlBuilder} from './url.builder';

export * from './api-base.command';
export * from './api.client';

@NgModule({
    imports: [HttpClientModule],
    providers: [ApiClient, UrlBuilder],
})
export class ApiClientModule {}
