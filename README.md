# API client for Angular

[![Build Status](https://img.shields.io/travis/erento/angular-api-client.svg?style=flat-square)](https://travis-ci.org/erento/angular-api-client)
![License](https://img.shields.io/github/license/erento/angular-api-client.svg?style=flat-square)

Easy to use API client based on the [Command pattern](https://en.wikipedia.org/wiki/Command_pattern) for [Angular framework](https://github.com/angular/angular).

This module works with Angular 2.4 and higher.

## Installation
```sh
npm install --save ng2-api-client
```

## Quick start
Import __API client module__ to your `app.module.ts`
```ts
// ...
import {ApiClientModule} from 'ng2-api-client';
// ...

@NgModule({
  declarations: [AppComponent],
  imports: [
    // ...
    ApiClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Inject it to your class (could be Component, Service, etc...)
- `app.component.ts`:  
  ```ts
  import {Component, OnInit} from '@angular/core';
  import {ApiClient} from 'ng2-api-client';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  })
  export class AppComponent implements OnInit {
    constructor(private apiClient: ApiClient) {}
    
    ngOnInit() {
      this.apiClient
        .executeRequest<User>(new FetchUserCommand('u-u-i-d'))
        .subscribe((user: User) => {
          console.log('My user data is: ', user);
        });
    }
  }
  ```

- `fetch-user.command.ts`:  
  ```ts
  import {RequestMethod} from '@angular/http';
  import {ApiBaseCommand, UrlPathParameters} from 'ng2-api-client';
  
  export class FetchUserCommand implements ApiBaseCommand {
    public headers: Headers = new Headers({'X-Forwarded-For': 'proxy1'});
    public method: RequestMethod = RequestMethod.Get;
    public url: string = '/api/user/:uuid';
    public urlPathParameters: UrlPathParameters;

    constructor (userUuid: string) {
      this.urlPathParameters = {uuid: userUuid};
    }
  }
  ```

## How to retry an request?
`ApiClient.executeRequest` has a second parameter where you can pass an amount
of required retries and the ApiClient will take care of it.

## Documentation

### Command
#### Required properties:

- __method__

  The property method defines the HTTP method. It requires the enum value of `RequestMethod` from `@angular/http`.

- __url__

  The url path without a scheme. Url can include wildcards starting with `:`.
  
  Examples: `/api/user/:id` or `/api/user/:name/:lastname` ...
  
  If the url includes the wildcard it will be validated with an input defined in the property
  `urlPathParameters` and replaced by the provided value.


#### Optional properties:

- __urlPathParameters__

  This is required when the wildcard is included in the url.
  
  Example: `{role: 'admin'}` with the url: `/user/:role` will generate: `/user/role`

- __queryParameters__

  An object defining query parameters.
  
  _Examples:_
  
   `{search: 'neymar', team: 'psg'}` will generate: `?search=neymar&team=psg`

- __headers__

  You can provide headers with the usage of `Headers` object from `@angular/http`.

- __body__

  Used to set the body of your request.

- __withCredential__

  Boolean value that indicates whether or not requests should be made using credentials
  such as cookies, authorization headers or TLS client certificates.

## Testing
Run `npm test` to execute tests.

### License
The MIT License (see the [LICENSE](LICENSE.md) file for the full text)
