const users = require("../data/fakeUsers.json");

class UsersService {
  static find() {
    return users;
  }

  static findById(id) {
    const user = users.find((user) => {
      return user.id === parseInt(id);
    });

    return user;
  }
}

module.exports = UsersService;