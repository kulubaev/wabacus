const route = (cache) => {

  return {
    inbound: (message, next) => {
      const { id } = message.data;
      cache[id](message.data);
      cache[id] = null;

      next();
    }
  }

}

module.exports = route;
