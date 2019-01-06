class Pipeline {

  constructor(socket) {
    this.socket = socket;

    this.inbound = [];
    this.outbound = [];

    socket.on('message', (message) => {
      this.execute(this.inbound,{data: message});
    });

  }

  send(data) {
    const message = {data};
    this.execute(this.outbound,  message , () => {
      this.socket.send(message.data);
    });

  }

  use({inbound, outbound}) {
    if(inbound) {
      this.inbound.push(inbound);
    }

    if(outbound)
      this.outbound.unshift(outbound);
  }

  execute(middleware, params, onDone) {

    const iterator = (index) => {

      if(index === middleware.length) {
        return onDone && onDone();
      }


      middleware[index].call(this, params, (error) => {

        if(error) {
          console.log('error ' + error);
          return;
        }

        iterator.call(this, ++index);

      });
    }

    iterator.call(this, 0);

  }

}

module.exports = Pipeline;

