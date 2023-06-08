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
app.use(cors({ origin: "*" }));
app.use(bp.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/build"));

connection.connect(e => {
  if (e) console.log(e.stack);
  console.log('connected');
});

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (rq, rs) => {
  // rs.send('root point');
  rs.sendFile('/index.html');
  console.log(rq.socket.remoteAddress);
});

app.post('/find', (rq, rs) => {
  sql = `select * from myblog where id=${rq.body.id}`;
  try {
    connection.query(sql, (e, r, f) => {
      if (r.length < 1) {
        rs.sendStatus(404);
      }
      else {
        rs.send(r);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.post('/selectmax', (rq, rs) => {
  sql = 'select max(id)+1 id from myblog';
  try {
    connection.query(sql, (e, r, f) => {
      rs.send(r);
    });
  } catch (e) {
    console.log(e);
  }
})

app.post('/loadall', (rq, rs) => {
  try {
    sql = `select * from myblog`;
    connection.query(sql, (e, r, f) => {
      rs.send(r);
    });
  } catch (e) {
    console.log(e);
  }
});

app.post('/insert', (rq, rs) => {
  const body = rq.body;
  sql = `insert into myblog values(${parseInt(body.id)}, '${body.name}', '${body.maintext}', '${body.date}')`;
  try {
    connection.query(sql, (e, r, f) => {
      if (e) {
        throw e;
      };
      rs.sendStatus(201);
    })
  } catch (e) {
    console.log(e);
  }
});

app.post('/delete', (rq, rs) => {
  const body = rq.body;
  sql = `delete from myblog where id = ${body.id}`;
  try {
    connection.query(sql, (e, r, f) => {
      if (e) {
        throw e;
      }
      rs.sendStatus(201);
    })
  } catch (e) {
    console.log(e);
  }
});

app.post('/update', (rq, rs) => {
  const body = rq.body;
  sql = `update myblog set title = '${body.name}', maintext = '${body.maintext}' where id = ${body.id}`;
  try {
    connection.query(sql, (e, r, f) => {
      if (e) {
        throw e;
      }
      rs.sendStatus(201);
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, e => console.log('server is running'));