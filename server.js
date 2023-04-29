const express = require('express');
const app = express();
const port = 3333;

app.get('/', (rq, rs) => {
  // rs.sendFile('./build/index.html');
  console.log(rq.socket.remoteAddress);
});
app.listen(port, e => console.log('server is running'));