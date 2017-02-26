# API client for Angular

Easy to use API client based on [Command patter](https://en.wikipedia.org/wiki/Command_pattern) for [Angular framework](https://github.com/angular/angular).

This module works with Angular 2.4 and higher.

## Installation
```sh
npm install --save ng2-api-client
```

## Quick start
Import __API client module__ to your `app.module.ts`
```ts
// ...
import { ApiClientModule } from 'ng2-api-client';
// ...

@NgModule({
  declarations: [
    AppComponent,
  ],
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
    styleUrls: ['./app.component.css'],
    providers: [ApiClient],
  })
  export class AppComponent implements OnInit {
    constructor(private apiClient: ApiClient) {}
    
    ngOnInit() {
      this.apiClient.executeRequest<User>(new FetchUserCommand()).subscribe((user: User) => {
        console.log('My user data is: ', user);
      });
    }
  }
  ```

- `fetch-user.command.ts`:  
  ```ts
  import {RequestMethod} from '@angular/http';
  import {ApiBaseCommand} from 'ng2-api-client';
  
  const url: string = '/api/search/products/:uuid';
  
  export class FetchUserCommand extends ApiBaseCommand {
      public method: RequestMethod = RequestMethod.Get;
  
      constructor (userUuid: string) {
          super(url, {
              uuid: userUuid // `uuid` matches flag in the url and will be automatically replaced 
          });
      }
  }
  ```

## Testing
Run `npm test` to execute tests.

### License
The MIT License (see the [LICENSE](LICENSE.md) file for the full text)
