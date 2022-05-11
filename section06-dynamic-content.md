# Section 06 Dynamic Content

1. Sharing Data Across Requests & Users
2. An Overview of Templating Engines
<!--  -->
3. Installing & Implementing Pug
4. Outputting Dynamic Content
5. Converting HTML Files to Pug
6. Adding a Layout
7. Finishing the Pug Template
<!--  -->
8. Working with Handlebars
9. Converting our Project to Handlebars
10. Adding the Layout to Handlebars
<!--  -->
11. Working with EJS
12. Working on the Layout with Partials

## An Overview of Templating Engines

Other than Node or Express content, templating engine reads HTML template and replaces placholder or snipperts with HTML content.

- **Pug**: Use minimal HTML and custom template language
- **Handlebars**: Use normal HTML and custom template language
- **EJS**: Use normal HTML and plain JavaScript in your templates

## Concepts

- Pug
- Handlebars
- EJS and Partials

## Codes

```js
// app
app.set("view engine", "ejs");
app.set("views", "views");

// route
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
```

## Useful Resources

- [Pug Documentation](https://pugjs.org/api/getting-started.html)
