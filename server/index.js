import express from 'express';
import routes from './routes';
import db from './db';

let d = new db();

let app = express();

let port = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/../public'));
app.use('/', routes(d));

app.listen(5000, () => {
  console.log("listening on 5000");
})
