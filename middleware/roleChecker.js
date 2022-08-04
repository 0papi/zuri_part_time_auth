const roleChecker = (role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== role) {
      res.status(401).json({ error: "You are not permitted" });
    }
    next();
  };
};

module.exports = roleChecker;
