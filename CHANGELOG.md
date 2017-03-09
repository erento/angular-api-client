<a name="2.0.0"></a>
# [2.0.0](https://github.com/angular/angular-cli/compare/v1.0.0...v2.0.0) (2017-03-09)

### Features

* Added `withCredentials` to the command. ([e63e060](https://github.com/erento/angular-api-client/commit/e63e060))

### Breaking changes

* There was a major refactoring for the command. The command is not a super class anymore, it is an interface.
The logic for building query parameters and constructing urls was separated. The command is now a plain
value object responsible to carry information of the desired request. ([d79fb53](https://github.com/erento/angular-api-client/commit/d79fb53))

  _Before:_

  ```ts
  export class FetchUserCommand extends ApiBaseCommand {
      public method: RequestMethod = RequestMethod.Get;
  
      constructor (userUuid: string) {
          super('/api/user/:uuid', {
              uuid: userUuid 
          });
      }
  }
  ```
  
  _After:_
  
  ```ts
  export class FetchUserCommand implements ApiBaseCommand {
      public method: RequestMethod = RequestMethod.Get;
      public url: string = '/api/user/:uuid';
      public urlPathParameters: UrlPathParameters;
  
      constructor (userUuid: string) {
        this.urlPathParameters = {uuid: userUuid};
      }
  }
  ```

<a name="1.0.0"></a>
# 1.0.0 Initial version