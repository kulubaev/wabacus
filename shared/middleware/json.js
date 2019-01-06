const json = () => {

  return {
    inbound: (message, next) => {
      message.data = JSON.parse(message.data.toString());
      next();
    },

    outbound: (message, next)  => {
      message.data = Buffer.from(JSON.stringify(message.data));
      next();
    }
  }

}

module.exports = json;
