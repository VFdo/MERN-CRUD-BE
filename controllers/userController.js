const User = require("../models/user");

exports.create = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: "User created successfully", user });
    }
  });
};

exports.get = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const { userId } = req.params;
  
    User.findByIdAndUpdate(userId, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: "Cannot update User."
          });
        } else res.status(200).json({ message: "User was updated successfully."});
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };

  exports.delete = (req, res) => {
    const { userId } = req.params;
  
    User.findByIdAndRemove(userId)
      .then(data => {
        if (!data) {
          res.status(404).json({
            message: "Cannot delete User"
          });
        } else {
          res.status(200).json({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };