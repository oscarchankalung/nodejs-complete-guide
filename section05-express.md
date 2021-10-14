# Section 05 Working with Express.js

1. What is Express.js?
2. Installing Express.js
3. Adding Middleware
4. How Middleware Works
5. Behind the Scenes of Express.js //
6. Handling Different Routes
7. Parsing Incoming Requests
8. Limiting Middleware Execution to POST Requests //
9. Using Express Router
10. Adding a 404 Error Page
11. Filtering Paths
12. Creating HTML Pages
13. Serving HTML Pages
14. Returning a 404 Page //
15. Using a Helper Function for Navigation
16. Styling our Pages
17. Serving Files Statically

## Introduction to Express.js and Middleware

**Express** is a minimal and flexible Node.js web application framework tha provides a lightweight and robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs. Many popular frameworks are based on Express.

**Middleware** functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle. The `next` function is a function in the Express router which, when invoked, executed the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

- Execute any code
- Make changes to the request and the response objects
- End the request-response cycle
- Call the next middleware in the stack

## Handling Routes and Request

**Routing** refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```
app.METHOD(PATH, HANDLER)
```

Where:

- `app` is an instance of `express`.
- `METHOD` is an HTTP request method, in lowercase.
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

**HTTP** is a protocol for fetching resources such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser. A complete document is reconstructed from the different sub-documents fetched, for instance, text, layout description, images, videos, scripts, and more.

HTTP defines a set of **request methods** to indicate the desired action to be performed for a given resource. Although they can also be nouns, these request methods are sometimes referred to as HTTP verbs. Each of them implements a different semantic, but some common features are shared

## Code Seperation of Concerns

There is no definitive answer to how one should structure an application. The answer depends on the scale of your application and the team that is involved. To be as flexible as possible, Express makes no assumptions in terms of structure.

Routes and other application-specific logic can live in as many files as you wish, in any directory structure you prefer. View the following examples for inspiration:

- [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

## Concepts

- Routing
- Middleware
- HTTP Request Methods

## Codes

```
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(express.static("public"));

app.use(routes);

router.use((req, res, next) => { next() });
router.get((req, res, next) => {
  res.write()
  res.send()
  res.sendFile()
});
router.post()

app.listen(3000)
```

## Useful Resources

- [Express.js GitHub](https://github.com/expressjs/express)
- [Express.js Documentation](https://expressjs.com/)
- [MDN Wen Docs HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
