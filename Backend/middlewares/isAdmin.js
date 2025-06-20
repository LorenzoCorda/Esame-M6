const isAdmin = (request, response, next) => {
  const { role } = request.body;

  if (role !== "admin") {
    return response.status(403).send({
      message: "You need to be an admin to acces at resourse",
    });
  }
  next();
};

module.exports = isAdmin;
