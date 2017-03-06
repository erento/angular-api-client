# API client for Angular

[![Build Status](https://img.shields.io/travis/erento/angular-api-client.svg?style=flat-square)](https://travis-ci.org/erento/angular-api-client)
![License](https://img.shields.io/github/license/erento/angular-api-client.svg?style=flat-square)

Easy to use API client based on [Command pattern](https://en.wikipedia.org/wiki/Command_pattern) for [Angular framework](https://github.com/angular/angular).

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
`ApiClient.executeRequest` has second parameter where you can pass amount
of required retries and ApiClient will take care of it.

## Documentation

### Command
#### Required properties:

- __method__

  Method defines HTTP method. It requires enum value of `RequestMethod` from `@angular/http`.

- __url__

  The url path without a scheme. Url can include wildcards starting with `:`.
  
  Examples: `/api/user/:id` or `/api/user/:name/:lastname` ...
  
  If url includes the wildcard it will be validated with an input defined in the property
  `urlPathParameters` and replaced by provided value.


#### Optional properties:

- __urlPathParameters__

  This is required when the deeplink is included in url.
  
  Example: `{role: 'admin'}` with url: `/user/:role` will generate: `/user/role`

- __queryParameters__

  Query parameters define query part. It is array of tuple of `key, value`.
  
  _Examples:_
  
   `[['id', 3], ['name', 'John']]` will generate: `?id=3&name=John`

- __headers__

  You can provide headers with usage of `Headers` object from `@angular/http`.

- __body__

  Used to set body of your request.

## Testing
Run `npm test` to execute tests.

### License
The MIT License (see the [LICENSE](LICENSE.md) file for the full text)
