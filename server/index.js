import express from 'express';
import routes from './routes';
import db from './db';

let d = new db();

let app = express();

let port = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/../public'));
app.use('/', routes(d));

app.listen(port, () => {
  console.log("listening on " + port);
})
