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

- Types Of Decorators :
  - `@Module()` : Decorator that marks a class as a module.
  - `@Controller('name')` : Decorator that marks a class as a Nest controller that can receive inbound requests and produce responses. An HTTP Controller responds to inbound HTTP Requests and produces HTTP Responses. It defines a class that provides the context for one or more related route handlers that correspond to HTTP request methods and associated routes for example GET /api/profile, POST /users/resume.
  - `@Injectable()` : Decorator that marks a class as a provider.Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system.
  - To Setup a Module Globally We use ``@Global()`` decorator 
  - `@Req()` to use Reqest Decorators because of NestJs uses express under the hood ``` @Req() req: Request ```

##### Dependency Injection

- Dependecy Injection in NestJS operates through its Inversion Of Control (IoC) Container, which automatically manages the representation and injection of dependencies. When a Class is marked with the `@Injectable` decorator, It becomes a provider that can be injected into other classes.
- These dependencies are specified in the constructor of a class, and the IoC container resolves them at runtime. This allows for clear and maintainable code, as dependencies are not created manually but injected as needed.

##### What are Controllers & Services ?

- Controllers are responsible for handling incoming requests and returning responses to the client
- Controllers and services are where the Code Logic is written
- In Controllers we use `@Controller()` decorator
- In Services we use `@Injectable()` decorator
- Creating Services through CLI  by default it creates a spec file and if you don't want use second command 
```bash 
nest g service 'servicename'
nest g service 'servicename' --no-spec # Without spec file
```

##### What are Providers ?

- In Nest, Many of the Nest basic nest classes, such as services, repositories, factories, and helpers, can treated as providers.



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
