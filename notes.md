## Nest JS Notes

### What is Nest Js ?

- Nest Js is a Nodejs Framework designed for Building efficient,scalable and maintainable server-side applications. It leverages typescript by default . offering strong typing and modern JS features.

##### Features Of Nest JS

- Typescript Friendly
- Solves Architecture
- Uses Express JS under the hood
- Scalable & Maintanable
- Modular Structure
- Uses dependency injection

##### Project Setup

```bash
npm i -g @nestjs/cli
nest new "project-name"
```

### Modules in Nodejs

`Def :` A module is a class that is annotated with the `@Module` decorator. if it's not annotated with `@Module` decorator it's not a module.

- A module can import other modules the app.module.ts is the main module this module imports other modules
- any module can itself import also `controllers` and `providers`
- Creating a module through cli `nest g module 'modulename'` example you want to create an auth module just type `nest g module auth`
- The `@Module` decorator takes a single Object with Properites that describe the module
  - `providers` : the providers that will be instantiated by the Nest injector and that may be shared at least across this module
  - `controllers` : the set of controllers defined in this module which have to be instantiated
  - `imports` : the list of imported modules that export the providers which are required in this module
  - `exports`: the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)

##### What is Decorator ?

- `Def` : Decorator is just a function that adds some meta data to the current class or function that it is kind of decorating . SO just adds more properties to that class

- **Common Decorators** :
  - `@Module()` : Decorator that marks a class as a module.
    - `@Module()` decorator contains following properties in object
      - {
        controllers : Optional list of controllers defined in this module which have to be instantiated.,
        providers : Optional list of providers that will be instantiated by the Nest injector and that may be shared at least across this module.,
        exports : Optional list of the subset of providers that are provided by this module and should be available in other modules which import this module.,
        imports : Optional list of imported modules that export the providers which are required in this module.
        }
  - `@Controller('name')` : Decorator that marks a class as a Nest controller that can receive inbound requests and produce responses. An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses. It defines a class that provides the context for one or more related route handlers that correspond to HTTP request methods and associated routes for example GET /api/profile, POST /users/resume.
  - `@Injectable()` : Decorator that marks a class as a provider.Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system.
  - To Setup a Module Globally We use `@Global()` decorator
  - `@Req()` to use Reqest Decorators because of NestJs uses express under the hood `@Req() req: Request`
  - `@Global()` Once imported into any module, a global-scoped module will be visible in all modules. Thereafter, modules that wish to inject a service exported from a global module do not need to import the provider module.
  - `@Req()` is not widely used why because if we want to move to `fastify` so for that we can use below decorator
  - `@Body()` it allows the body of a request and this is how we use in code `@Body() dto:any()` instead of any you can give the type of body , instead of `@Req()` if we use `@Body()` it will adjust accordingly to all types of apis like rest , fastify

##### Dependency Injection

- Dependecy Injection in NestJS operates through its Inversion Of Control (IoC) Container, which automatically manages the representation and injection of dependencies. When a Class is marked with the `@Injectable` decorator, It becomes a provider that can be injected into other classes.
- These dependencies are specified in the constructor of a class, and the IoC container resolves them at runtime. This allows for clear and maintainable code, as dependencies are not created manually but injected as needed.

##### What are Controllers & Services ?

- Controllers are responsible for handling incoming requests and returning responses to the client
- Controllers and services are where the Code Logic is written
- In Controllers we use `@Controller()` decorator
- In Services we use `@Injectable()` decorator
- Creating Services through CLI by default it creates a spec file and if you don't want use second command

```bash
nest g service 'servicename'
nest g service 'servicename' --no-spec # Without spec file
```

##### What are Providers ?

- In Nest, Many of the Nest basic nest classes, such as services, repositories, factories, and helpers, can treated as providers.

### DTO (Data Transfer Object)

- DTO is a design pattern that is widely used in Software development to transfer data between different layers of an application
- The Main Idea behind in DTO pattern is to encapsulate data and provide a standardised way of transferring it b/w different parts of the application
- In simpler words , **DTO** is a simple object that contains data and may have some validation logic

```ts
// auth.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// auth.controller.ts
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    return this.authService.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
}
```

#### Required Packages Installation for Auth

```bash
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt
  npm i -D @types/passport-jwt
```

- The Process of Validating request is called validation in Nestjs there are lot of tools to achieve that for that we use DTO
- Using `Class Transformers and Class Validator Libraries` we can simplify the validation logic like we needn't to write

- To Use Class Transdformers and Class Validator install those by running below command
  `bash 
 npm i --save class-validator class-transformer
`
- after creating a DTO class we need to tell nest js to work the pipe logic globally and how we do that in `main.ts` file we add this line

```ts
// In main.ts file
app.useGlobalPipes(new ValidationPipe());
```

- `useGlobalPipes` : Registers pipes as global pipes (will be used within every HTTP route handler)
- `ValidationPipe()` : Validates incoming data based on decorators such as `@Body()`, `@Query()`, etc.
  - `ValidationPipe({whitelist : true} )` : This whitelist strips unnecessary fields in request

## Pipes in Nestjs

- In Nestjs Pipes is a Class that sits between the Incoming Request and your Controller .
- Its Main Jobs are
  - **_Transformation_** :: Change Incoming Data into the desired format
    - Example: Convert a string "42" from query params into a number 42.
  - **_Validation_** :: Check that the data matches rules you've defined.
    - Example : Ensure age is an integer between 1 and 100
- **_How Pipes Work_** ::
  When a Request Hits your API

```
Client → Pipe(s) → Controller → Service → Response
```

Pipes are executed before the controller method is called.

- **Types of Pipes**
  - **Built in Pipes**
    - **ParseIntPipe:** Converts a string to an integer.
    - **ParseFloatPipe:** Converts a string to a floating-point number.
    - **ValidationPipe** Validates incoming data based on decorators such as `@Body()`, `@Query()`, etc.
    - **DefaultValuePipe** Provides default values when a value is missing.
  - **Custom Pipes**
    - For specialized requirements, you can create custom pipes by implementing the PipeTransform interface. This allows you to handle intricate transformations and validations tailored to your application's needs.

**_To enable the Validation Using Pipes_**

```ts
// In main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Below Line is Important for Pipes Concept
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // strips extra fields
  await app.listen(3000);
}
bootstrap();
```

**Why Pipes are Important** ?

- Security → Prevents extra unwanted data from reaching your business logic.
- Clean Data → Your services only work with the fields you expect.
- Consistency → Same validation rules everywhere without repeating code.

**Q) Is Middlewares and Pipes are Same ?**
A) No They are Not Same ,
**Middleware :**

- Runs before the request hits any route handler
- Works at the raw request/response level (Like in Express)
- Can be used for
  - Logging
  - Auth Checks
  - Modifying the request/response objects directly
- Scope : Global or route-level,but not tied to specific parameters
  **Pipe**
- Runs after the middleware stage but before the controller method
- Works on arguments passed in to your route handler (e.g., @Body() , @Query())
- Designed for :
  - Validation → Check if data is valid based on DTOs or rules.
  - Transformation → Convert data types (string → number, etc.).
- Scope:
  Can be global , Controller-level, or even parameter level
  Example (parameter -level)

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.service.findOne(id);
}
```

**FLow Order In Nest JS**

```
Request →
[Middleware Stage] →
[Guards (auth checks)] →
[Interceptors (pre-processing)] →
[Pipes (validation/transformation)] →
Controller →
Service →
Response
```

### Config Module In Nestjs

- Installation `npm install @nestjs/config` package is a configuration module for the nestjs framework, which is based on the `dotenv` package to load environment variables .
- This module helps manage and access configuration variables in a structured manner

- **_Usage_**
  - **Import the ConfigModule** : Import and configure the `ConfigModule` in your root module (e.g., `AppModule`)

```js
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

- **Access Configuration Variables** : Inject the ConfigService into your services or controllers to access configuration variables.

```js
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
constructor(private configService: ConfigService) {}

getDatabaseHost(): string {
return this.configService.get<string>('DATABASE_HOST');
}
}
```

## PRISMA CONNECTION FOR DATABASE Postgres

- To work with prisma we have to install two packages
  - prisma cli
  - prisma client

```bash
npm i -D prisma
npm i @prisma/client
```

Then Run the Command to initiate the Prisma Client

```bash
npx prisma init
```

as this will create some files in our code like .env with DATABASE_URL for Postgres and prisma folder with schema.prisma file in this file where you create a models for database

#### Some of the Useful Commands In prisma Setup

```bash
 Set up a new local Prisma Postgres `prisma dev`-ready project
     $ prisma init

     Start a local Prisma Postgres server for development
     $ prisma dev

     Generate artifacts (e.g. Prisma Client)
     $ prisma generate

     Browse your data
     $ prisma studio

     Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
     $ prisma migrate dev

     Pull the schema from an existing database, updating the Prisma schema
     $ prisma db pull

     Push the Prisma schema state to the database
     $ prisma db push

     Validate your Prisma schema
     $ prisma validate

     Format your Prisma schema
     $ prisma format

     Display Prisma version info
     $ prisma version

     Display Prisma debug info
     $ prisma debug
```

and we run `npx prisma migrate dev` it will convert those models and create a tables in databases
after that we import those tables in Our Code like this as below

- To view the data in UI you can do that by running the command

```bash
npx prisma studio
```

```js
import { User, Bookmark } from '@prisma/client';
```
