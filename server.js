const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const pageRoutes = require("./routes/page.routes")
const apiRoutes = require("./routes/api.routes")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(pageRoutes);
app.use("/api", apiRoutes)
// LISTEN FOR REQUESTS!!!!
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});