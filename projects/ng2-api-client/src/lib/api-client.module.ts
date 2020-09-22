import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {ApiClient} from './api.client';
import {UrlBuilder} from './url.builder';

export interface ApiClientModuleConfig {
    httpClient: Provider;
}

@NgModule()
export class ApiClientModule {
    /**
     * Use this method in your root module to provide the ApiClient
     */
    static forRoot (config: ApiClientModuleConfig): ModuleWithProviders<ApiClientModule> {
        return {
            ngModule: ApiClientModule,
            providers: [
                config.httpClient,
                ApiClient,
                UrlBuilder,
            ]
        };
    }
}
