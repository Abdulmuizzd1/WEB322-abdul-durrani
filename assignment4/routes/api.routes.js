const express = require("express");
const users = require("../data/fakeUsers");
const products = require("../data/fakeProducts");
const apiRoutes = express.Router();


apiRoutes.get("/users", (req, res)=>{res.json(users)})

apiRoutes.get("/user/:id",(req, res) =>{
    const id = req.params.id;
    const user = users.find((user) => {
      return user.id == id;
    });
    const conteent = `background-color: black;`
res.json(user);
}); 

apiRoutes.get("/products", (req, res)=>{res.json(products)})

apiRoutes.get("/products/:id",(req, res) =>{
    const id = req.params.id;
    const prod = products.find((prod) => {
      return prod.id == id;
    });
res.json(prod);
}); 


module.exports = apiRoutes;