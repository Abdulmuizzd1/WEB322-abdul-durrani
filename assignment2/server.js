const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const users = require("./fakeUsers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DRY - Do not repeat yourself

const menu = `<nav><a href="/">Home</a>&nbsp;|&nbsp;<a href="/list">List</a></div>`;


const template = function (title, html) {
  return `<html>
    <head>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
    crossorigin="anonymous"
  />
    </head>
    <body class="container">
        <div>${menu}</div>
        <h1>${title}</h1>
        <div>
            ${html}
        </div> 
    </body>
    </html>`;
};

// ROUTE HANDLING
app.get("/", (req, res) => {
  const content = `<form method="POST"><input type="text" name="username" /><input type="password" name="password" /><button class="btn btn-primary" type="submit">GO!</button></form>`;
  const html = template("Login", content);
  res.send(html);
});

app.post("/", (req, res) => {
    // Get the submitted username and password from the request body
    const { username, password } = req.body;
  
    // Replace "admin" and "123" with your desired username and password for validation
    const validUsername = "admin";
    const validPassword = "abc";
  
    if (username === validUsername && password === validPassword) {
      // If the credentials are correct, redirect to /list
      res.redirect(`/list`);
    } else {
      // If the credentials are incorrect, redirect to /failure or display an error message
      res.redirect(`/failure`);
      // You can also display an error message instead of redirecting.
      // res.send("Invalid username or password. Please try again.");
    }
  });
  

app.get("/list", (req, res) => {

    const f25 = users.slice(0, 25);

  const userListHtml = f25.map((user) => {
    return `<li><a href="/detail/${user.id}">${user.id}\t ${user.firstName}</a></li>`;
  });

  const content = `<ul>${userListHtml.join("")}</ul>`;

  const html = template("List", content);
  res.send(html);
});

app.get("/failure", (req, res) => {
    const content=`<h5>Username: admin<h5><h5>Password: abc<h5><br><img src="https://www.azquotes.com/picture-quotes/quote-never-give-up-all-you-have-to-do-is-try-again-park-bom-61-85-45.jpg" alt="Image Description">`
    const html = template("failure", content);
    res.send(html);
  });

//Username: admin Password: abc
app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => {
    return user.id == id;
  });

  const content = `
    <div>
      <h2>User Details</h2>
      <p>ID: ${user.id}</p>
      <p>First Name: ${user.firstName}</p>
      <p>Last Name: ${user.lastName}</p>
      <p>Email: ${user.email}</p>
      <p>Password: ${user.password}</p>
      <p>Date of Birth: ${user.dob}</p>
      <p>Company: ${user.company}</p>
      <p>Phone: ${user.phone}</p>
    </div>
  `;const html = template("Detail", content);

  res.send(html);
});

// LISTEN FOR REQUESTS!!!!
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});