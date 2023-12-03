const express = require("express");
const pageRoutes = express.Router();
const users = require("../data/fakeUsers");
const products = require("../data/fakeProducts");
const UsersService = require("../services/users.service");
const AuthenticationService = require("../services/authentication.service");


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
const menu = `<nav><a href="/">Home</a>&nbsp;|&nbsp;<a href="/list">User list</a>&nbsp;|&nbsp;<a href="/prodlist">Product list</a></div>`;

// ROUTE HANDLING
pageRoutes.get("/", (req, res) => {
    const content = `<form method="POST"><input type="text" name="username" /><input type="password" name="password" /><button class="btn btn-primary" type="submit">GO!</button></form>`;
    const html = template("Login", content);
    res.send(html);
  });
  pageRoutes.post("/", (req, res) => {
      // Get the submitted username and password from the request body
      const { username, password } = req.body;
    
      // Replace "admin" and "123" with your desired username and password for validation
      const List = "List";
      const Prod = "Products"
      const validPassword = "a";
    
      if (username === List && password === AuthenticationService.authenticate) {
        // If the credentials are correct, redirect to /list
        res.redirect(`/list`);
      } else if(username === Prod && password === AuthenticationService.authenticate){
        res.redirect(`/prodlist`);
      } else {
        // If the credentials are incorrect, redirect to /failure or display an error message
        res.redirect(`/failure`);
        // You can also display an error message instead of redirecting.
        // res.send("Invalid username or password. Please try again.");
      }
    });
    pageRoutes.get("/list", (req, res) => {
  
      const f25 = users.slice(0, 25);
  
    const userListHtml = f25.map((user) => {
      return `<li><a href="/detail/${user.id}">${user.id}\t ${user.firstName}</a></li>`;
    });
  
    const content = `<ul>${userListHtml.join("")}</ul>`;
  
    const html = template("List", content);
    res.send(html);
  });
  pageRoutes.get("/prodlist", (req, res) => {
    const f25 = products.slice(0, 25);
  
    const productListHtml = f25.map((product) => {
      return `<li><a href="/products/${product.id}">${product.id}\t ${product.name}</a></li>`;
    });
  
    const content = `<ul>${productListHtml.join("")}</ul>`;
  
    const html = template("Product List", content);
    res.send(html);
  });
  pageRoutes.get("/failure", (req, res) => {
      const content=`<h4><u>Usernames:</u></h4><h5>Users: List<h5><h5>Products: Products<h5><h5>Password: a<h5><br><img src="https://www.azquotes.com/picture-quotes/quote-never-give-up-all-you-have-to-do-is-try-again-park-bom-61-85-45.jpg" alt="Image Description">`
      const html = template("failure", content);
      res.send(html);
    });
    pageRoutes.get("/products/:id", (req, res) => {
      const id = req.params.id;
      const product = products.find((p) => {
        return p.id == id;
      });
    
      if (!product) {
        // Handle the case where the product with the given id is not found
        res.send("Product not found");
        return;
      }
    
      const content = `
        <div>
          <h2>Product Details</h2>
          <p>ID: ${product.id}</p>
          <p>Name: ${product.name}</p>
          <p>ISBN: ${product.isbn}</p>
          <p>Price: ${product.price}</p>
          <p>Description: ${product.description}</p>
        </div>
      `;
      const html = template("Product", content);
    
      res.send(html);
    });
    pageRoutes.get("/detail/:id", (req, res) => {
      const user = UsersService.findById(req.params.id);
  
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

  module.exports = pageRoutes;