const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bp = require('body-parser');
const port = 3333;
let sql = '';
let cnt = 0;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'madang'
});

app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: false }));

connection.connect(e => {
  if (e) console.log(e.stack);
  console.log('connected');
});

app.get('/', (rq, rs) => {
  rs.send('root point');
  console.log(rq.socket.remoteAddress);
});

app.get('/select', (rq, rs) => {
  sql = "select * from book union select * from customer";
  try {
    connection.query(sql, (e, r, f) => {
      rs.send(r);
    });
    console.log(rq.socket.remoteAddress, ++cnt);
  } catch (e) {
    console.log(e);
  }
});

app.post('/find', (rq, rs) => {
  try {
    let result;
    sql = `select * from book where bookid=${rq.body.id}`;
    connection.query(sql, (e, r, f) => {
      rs.send(r);
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, e => console.log('server is running'));