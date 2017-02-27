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
    providers: [ApiClient],
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
  import {ApiBaseCommand} from 'ng2-api-client';
  
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

## Testing
Run `npm test` to execute tests.

### License
The MIT License (see the [LICENSE](LICENSE.md) file for the full text)
