const logger = (request, response, next) => {
  const { url, ip, method } = request;

  console.log(
    `${new Date().toDateString()}Effettuata richiesta ${method} a indizzo ${url} da ip ${ip}`
  );

  next();
};

module.exports = logger;
