# Atc-Task

a small product managment dashboard with features like crud operations, authentication, filtering, pagination and a responsive ui.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Features

-Authentication & Authorization
Token-based authentication
Route guards to protect dashboard and product pages
-Dashboard
Displays 150+ products in a clean, responsive table layout
3 filters (search, active, perPage)
Pagination for better performance and user experience
Loading spinner and error handling
-CRUD Operations
Create Product page with form validation
Read Product Details page
Update Product form
Delete Product with confirmation popup
All operations integrated with a backend API
-UI/UX
Fully responsive layout (CSS + Tailwind)
Clean and modern components
Smooth user flow between pages

## Tech Stack

-Angular v19
-TypeScript
-RxJS
-CSS
-TailwindCSS
-Angular Router
-HTTPClient

##installation

-git clone
-cd my-project
-npm install

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
