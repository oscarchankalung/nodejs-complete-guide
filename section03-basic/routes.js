const fs = require("fs");

const requestHandler = (request, respond) => {
  // process.exit();
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    respond.write(`
      <html>
        <head><title>Enter Message</title></head>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message"/><button type="submit">Send</button> 
          </form>
        </body>
      </html>
    `);
    return respond.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        respond.statusCode = 302;
        respond.setHeader("Location", "/");
        return respond.end();
      });
    });
  }
  respond.setHeader("Content-Type", "text/html");
  respond.write(`
    <html> 
      <head><title>My First Page</title></head>
      <body><h1>Hello from my Node.js Server!</h1></body>
    </html>
  `);
  respond.end();
};

module.exports = { handler: requestHandler };
