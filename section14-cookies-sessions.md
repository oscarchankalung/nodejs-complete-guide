# Section 14 Cookies and Sessions

1. What is a Cookie?
2. The Current Project Status
3. Creating the Login Form
<!--  -->
4. Adding the Request Driven Login Solution
5. Setting a Cookie
6. Manipulating Cookies
7. Configuring Cookies
<!--  -->
8. What is a Session?
9. Initializing the Session Middleware
10. Using the Session Middleware
11. Using MongoDB to Store Sessions
<!--  -->
12. Deleting a Cookie
13. Fixing Some Minor Bugs
14. Making "Add to Cart" Work Again
15. Two Tiny Improvements
16. Code Adjustments

## Topics

- Why request driven login solution doesn't work?
  - use
  - request
  - global variable
- What is cookies?
  - configuration
  - third-party package: cookie-parser
  - storage: client, browser
- What is sessions?
  - configuration
  - third-party package: express-session
  - storage: server, database
- Summary
  - persists across requests
  - but not across users

## Concepts

- Cookie
- Session

## Codes

```js
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_PASSWORD = "byo8A220Al1sTtnS";
const MONGODB_URI = `mongodb+srv://oscarchankalung:${MONGODB_PASSWORD}@cluster0.vccxw.mongodb.net/shop`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(cookieParser());
app.use(
  session({
    secret: "12345678",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
```

## Useful Resources

- [Link](URL)
