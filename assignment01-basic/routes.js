const users = ["User 1", "User 2"];

const requestHandler = (request, respond) => {
  // process.exit();
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    respond.setHeader("Content-Type", "text/html");
    respond.write(`
      <html>
        <head><title>Assignment 01</title></head>
        <body>
          <h1>Greeting, try create a user</h1>
          <form action="/create-user" method="POST">
            <button type="submit">Create User</button><input type="text" name="username"/>
          </form>
          <form action="/users" method="POST">
            <button type="submit">List Users</button> 
          </form>
        </body>
      </html>
    `);
    console.log("/", users);
    return respond.end();
  }
  if (url === "/users") {
    respond.write(`
      <html>
        <head><title>Assignment 01</title></head>
        <body>
          <h1>Users</h1><ul>
    `);
    console.log("/users", users);
    users.forEach((user) => {
      respond.write(`<li>${user}</li>`);
    });
    respond.write(`
          </ul>
          <form action="/" method="POST">
            <button type="submit">Back</button> 
          </form>
        </body>
      </html>
    `);
    return respond.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      users.push(username);
      console.log("/create-user", username, users);
      respond.statusCode = 302;
      respond.setHeader("Location", "/");
      return respond.end();
    });
  }
  return respond.end();
};

module.exports = { handler: requestHandler };
