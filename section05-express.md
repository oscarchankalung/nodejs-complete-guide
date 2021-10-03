# Section 05 Working with Express.js

1. What is Express.js?
2. Installing Express.js
3. Adding Middleware
4. How Middleware Works
5. Behind the Scenes of Express.js //
6. Handling Different Routes
7. Parsing Incoming Requests
8. Limiting Middleware Execution to POST Requests
9. Using Express Router
10. Adding a 404 Error Oage
11. Filtering Paths
12. Creating HTML Pages
13. Serving HTML Pages
14. Returning a 404 Page //
15. Using a Helper Function for Naviation
16. Styling our Pages
17. Serving Files Statically

## Concepts

- Middleware

## Codes

```
const express = require("express");

const app = express();

app.use((req, res, next) => {
  next();
});

app.liste(3000)
```

## Useful Resources

- [expressjs/express: Fast, unopinionated, minimalist web framework for node.](https://github.com/expressjs/express)