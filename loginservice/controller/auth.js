const User =require('../model/user')
module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "name",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };