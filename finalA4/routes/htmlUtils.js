//Bootstrap middleware
const template = (title, html) => `
  <html>
    <head>
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous"/>
    </head>
    <body class="container">
      <nav>
          <a href="/">Home</a>&nbsp;|&nbsp;<a href="/users">Users</a>&nbsp;|&nbsp; <a href="/products">Products</a>
      </nav>    
      <h1>${title}</h1>
      <div>${html}</div> 
    </body>
  </html>
`


const htmlContent = (errorMsg = '') => `
  <form method="POST">
    <div>${errorMsg}</div>
    <br>

    Name:&emsp;&emsp; 
    <input type="text" name="username"/>
    <br>

    Password:&nbsp;&nbsp; 
    <input type="password" name="password"/>
    <br>

    <button type="submit">GO!</button>
  </form>
`

const userDetails = (user) => `
  <table class="user-table">
  <tbody>
      <tr>
          <th>ID:</th>
          <td>${user.id}</td>
      </tr>
      <tr>
          <th>First name:</th>
          <td>${user.firstName}</td>
      </tr>
      <tr>
          <th>Last name:</th>
          <td>${user.lastName}</td>
      </tr>
      <tr>
          <th>Email:</th>
          <td>${user.email}</td>
      </tr>
      <tr>
          <th>Birth date:</th>
          <td>${user.dob}</td>
      </tr>
      <tr>
          <th>Company:</th>
          <td>${user.company}</td>
      </tr>
      <tr>
          <th>Phone:</th>
          <td>${user.phone}</td>
      </tr>
  </tbody>
`

module.exports = {template, htmlContent, userDetails}