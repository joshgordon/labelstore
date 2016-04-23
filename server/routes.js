import {Router} from 'express';
import bodyparser from 'body-parser';

let app = new Router()

export default (d) => {

  app.get('/:namespace/:key', (req, res) => {
    d.getLabel(req.params.namespace, req.params.key).then((record) => {
      res.setHeader('content-type', 'text/plain');
      res.send(record);
    }, (err) => {
      if (err == 404) {
        res.status(404).send("NOT FOUND");
      } else { 
        res.status(500).send(err);
      }
    });
  });

  app.put('/:namespace/:key', bodyparser.text({ type: 'text/plain' }), (req, res) => {

    if (req.headers['content-type'] != 'text/plain') {
      res.status(400).send("You must specify a content type of text/plain");
    }

    d.setLabel(req.params.namespace, req.params.key, req.body).then(() => {
      res.send();
    }, (err) => {
      res.status(500).send(err);
    });
  });
    
  app.get('/:namespace', (req, res) => {
    d.getNamespace(req.params.namespace).then((records) => { 
      res.send(records);
    }, (err) => { 
      res.status(500).send(err);
    });
  });

  return app;
}
