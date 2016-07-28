Timelog React Django Example
============================

Timelog is an example React application that allows the user to add and view one
line timestamped log entries.

The purpose of this project is to provide a simple working example of a [React](https://facebook.github.io/react/)
web application that communicates with an API server implented in [Django](https://www.djangoproject.com).

Components Overview
-------------------

There are two key components to Timelog
* Web app - This is the client that runs in your web browser
* API Server - this is the REST API web server

This initial version is intended to be run via the development servers on the
user's machine.

### React App

The web application shows the user a list of any timestamped log entries stored on the
server and allows the user to add new entries, one at a time.

* The initial app was generated using [Yeoman](http://yeoman.io/) and the [react-webpack-alt](https://github.com/weblogixx/generator-react-webpack-alt) generator
* JavaScript is predominantly ECMAScript 2015 (aka ES6)
* SCSS is used for the stylesheets
  * Flexbox is used for the layout
* Uses [Alt.js](http://alt.js.org/) to implement the [Flux](https://facebook.github.io/flux/) pattern

#### Resources and Starting Points

* [Alt.js](http://alt.js.org/)
* [Babel JavaScript Compiler](https://babeljs.io/)
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Flux](https://facebook.github.io/flux/)
* [React](https://facebook.github.io/react/index.html)
* [SCSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [Webpack](https://webpack.github.io/)
* [Yeoman](http://yeoman.io/)


### Django REST API server

The REST API server provides a minimal Django app and site to allow creation and retrieval of timelog data. There is a single endpoint
```/api/events/``` that responds to GET and POST calls. The full default URL when run on localhost is  ```http://localhost:5000/api/events/```

To retrieve the collection of events, do a ```GET``` call. This will return a JSON array of event objects.

*TODO: Fill in object structure*

If there are no objects, then an empty array is returned.


To add an event, do a ```POST``` call on the endpoint, passing a JSON object with two keys: 'text' and 'ts'. The former contains the event log text and the later


### Resources

* [Django web framework](https://www.djangoproject.com/)


Getting Started - Running the example
-------------------------------------

This example app requires you run two web servers. One serves the React app. The other serves the Django REST API.

### React App

#### Prerequisite
You will need [Node.js](https://nodejs.org/en/) and [NPM (Node Package Manager)](https://docs.npmjs.com/getting-started/what-is-npm)


You can install Node.js by either using a pre-built [installer](https://nodejs.org/en/download/) or via a[package manager](https://nodejs.org/en/download/package-manager/) for your platform.


#### Setup

Open a terminal and navigate to the app directory and run 

```npm install```

This will install the package dependencies identified in the packages.json file


#### Starting the React app development server

This example uses the webpack development server to serve up the React app. The advantage of this is twofold: A) code changes


```npm start```

This will start the app server at [http://localhost:8000/webpack-dev-server/](http://localhost:8000/webpack-dev-server/)


Type ```Ctrl-C``` to stop the dev server.

### Django API Server

#### Prerequisites

You will need a [Python](https://www.python.org/) interpreter. It is also a good idea to run projects in isolated environments. If you are not familiar with the idea of creating isolated development environments, then check out [Virtual Environments page](http://docs.python-guide.org/en/latest/dev/virtualenvs/) on the [The Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/)

#### Setup


Open a terminal and navigate to this project's api/django directory

```pip install -r requirements.txt```


Set up the SQLite development database by running the following:
```python manage.py migrate```

#### Running the Django API server

start the development server on port 5000. This is because the React app expects this port to make AJAX requests.

```python manage.py runserver 5000```


Type ```Ctrl-C``` to stop the dev server.


What's Next?
------------
* Add support for HTTPS
* Add authentication example(s)
* Integrate the React app build with the Django server, so it can be run from one server
* Add tests 
* Add Django REST Framework example
* Demonstrate options for managing styles


Additional Resources
--------------------

* [Cross Origin Resource Sharing (CORS) W3C recommendation](https://www.w3.org/TR/cors/)
* [enable-cors.org](http://enable-cors.org/) Resource site hosted by the authors of the _CORS in action book_.
