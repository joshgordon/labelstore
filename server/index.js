import express from 'express';
import routes from './routes';
import db from './db';

let d = new db();

let app = express();

app.use('/', express.static(__dirname + '/../public'));
app.use('/', routes(d));

app.listen(3000, () => {
  console.log("listening on 3000");
})
