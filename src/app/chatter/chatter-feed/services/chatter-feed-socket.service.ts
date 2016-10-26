


// declare var io;

export default function Socket(socketFactory) {

  var io=require('socket.io-client')

      var chatterIoSocket, chatterSocket;

  chatterIoSocket = io.connect("http://localhost:8000");

      return socketFactory({
        ioSocket: chatterIoSocket
      });

    };





