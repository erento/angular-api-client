<a name="3.0.1"></a>
# [3.0.1](https://github.com/erento/angular-api-client/compare/v3.0.0...v3.0.1) (2017-05-15)
- Bug fix: The command's property `withCredentials` is now consistently converted to the boolean value.

<a name="3.0.0"></a>
# [3.0.0](https://github.com/erento/angular-api-client/compare/v2.0.3...v3.0.0) (2017-03-30)
- Increased the peer dependency on Angular to the version 4.
- Changed internal property of Request object from search to params (due to the change in Angular).

<a name="2.0.3"></a>
# [2.0.3](https://github.com/erento/angular-api-client/compare/v2.0.2...v2.0.3) (2017-03-09)
- Decrease the version of Angular peer dependency to ^2.4.0 again as implementation doesn't work in Angular v4 anymore.

<a name="2.0.2"></a>
# [2.0.2](https://github.com/erento/angular-api-client/compare/v2.0.1...v2.0.2) (2017-03-09)
- Fix tsconfig file. Added lib to fix the typings error due to changes in @types/core-js.

<a name="2.0.1"></a>
# [2.0.1](https://github.com/erento/angular-api-client/compare/v2.0.0...v2.0.1) (2017-03-09)
- Increase the version of Angular peer dependency from ^2.4.0 to >=2.4.0.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/erento/angular-api-client/compare/v1.0.0...v2.0.0) (2017-03-09)

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