const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3333;
let sql = '';
let cnt = 0;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'madang'
});

connection.connect(e => {
  if (e) console.log(e.stack);
  console.log('connected');
});

app.get('/', (rq, rs) => {
  // rs.sendFile('./public/index.html');
  rs.send('root point');
  console.log(rq.socket.remoteAddress);
});

app.get('/select', (rq, rs) => {
  sql = "select * from book";
  try {
    connection.query(sql, (e, r, f) => {
      rs.send(r);
      // console.log(r);
    });
    console.log(rq.socket.remoteAddress, ++cnt);
  } catch (e) {
    console.log(e);
  }
});

app.post('/insert', (rq, rs) => {
  sql = ''
});

app.listen(port, e => console.log('server is running'));