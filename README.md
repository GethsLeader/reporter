Reporter
========

DESCRIPTION
-----------

Trying to rewrite my [reports-editor](https://github.com/GethsLeader/reports-editor)
project with [Angular 2](https://angular.io) framework.
But it's just a simple browser application for parsing data from uploading __.xslx__ files.
I'll also keep in commits my experiments and tests - all what happens in framework studying process.

INSTALLATION
------------

####1) clone repository:

```
git clone git@github.com:GethsLeader/reporter.git
```

####2) install dependencies:

```
npm install
```

##### Dependencies reference (some of them still not used in project):

* **@angular/common** - angular 2 common stuff, i'm still dunno what inside it, not too curious right now
* **@angular/compiler** - angular 2 compiler for templates, i guess
* **@angular/core** - angular 2 core things, all basic stuff like component, injectable decorators and etc
* **@angular/forms** - forms workflow, i guess, still not used it here
* **@angular/http** - ajax workflow, probably - still not used it here yet
* **@angular/platform-browser** - something like application bootstrap, i think, but i'm still not sure
* **@angular/platform-browser-dynamic** - same, somewhere heard about including this later in @angular/platform-browser module
* **@angular/router** - should be router provider, but i'm still not used it yet
* **@angular/upgrade** - really do not know what is it
* **bootstrap** - css framework for easy nice looking gui building
* **font-awesome** - icons font, very easy to use (not used yet)
* **rxjs** - i'm really do not know what is it. And it's still in beta, so it's looks not too stable as looks on first look
* **ts-xlsx** - library for worksheets stuff working,
* **zone.js** - scopes zoning, i think

Also do not forget about __TypeScript__ compiler and bundler. I'm using [Webpack 2](https://webpack.github.io/) as bundler for this project.
Webpack configuration file can be found in in project root - __webpack.config.js__.
And... here also [Babel](https://babeljs.io/) in use.
Webpack bundler and TypeScript compiler installed globally and linked to project folder:

```
npm install -g typescript
npm link typescript
```
```
npm install -g webpack
npm link webpack
```

All other stuff should be in development dependencies.

####3) testing:

No. No test for now. Sorry. Trying to learn how to build it with karma and angular 2 later.

####4) launch:

* be sure about environment variables for development (use "production" for production)

```
WEBPACK_ENV=development
```

* build

```
webpack
```

* launch

Just open __dist/index.html__ in any modern browser.