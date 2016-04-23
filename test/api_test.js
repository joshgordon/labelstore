import should from 'should';
import supertest from 'supertest';

import express from 'express';
import api from '../server/routes'
import db from '../server/db';

let d = new db(':memory:');

let app = express();
app.use('/', api(d));

let namespace='FOOBAR';
let keys = ["key1", "key2"]
let values = ["value1", "value2", "value3"]

let server = supertest.agent(app);

describe('API test', () => {
  it('should return 404 on an invalid key', (done) => {
    server.get('/invalid/key').expect(404).end(done);
  });

  it('should reject an invalid key (content type not set)', (done) => {
    server.put(`/${namespace}/${keys[0]}`)
      .send(values[0])
      .expect(400)
      .end(done);
  });

  it('should be able to set a key', (done) => {
    server.put(`/${namespace}/${keys[0]}`)
      .set('content-type', 'text/plain')
      .send(values[0])
      .expect(200)
      .end(done);
  });

  it('should be able to get the key it just set', (done) => {
    server.get(`/${namespace}/${keys[0]}`).send()
      .expect(200)
      .expect(values[0])
      .end(done);
  });

  it('should be able to add another key', (done) => {
    server.put(`/${namespace}/${keys[1]}`)
      .set('content-type', 'text/plain')
      .send(values[1])
      .expect(200)
      .end(done)
  })

  it('should be able to get the key it just set', (done) => {
    server.get(`/${namespace}/${keys[1]}`).send()
      .expect(200)
      .expect(values[1])
      .end(done);
  });

  it('should be able to update a key', (done) => {
    server.put(`/${namespace}/${keys[0]}`)
      .set('content-type', 'text/plain')
      .send(values[2])
      .expect(200)
      .end(done)
  })

  it('should be able to get the key it just set', (done) => {
    server.get(`/${namespace}/${keys[0]}`).send()
      .expect(200)
      .expect(values[2])
      .end(done);
  });

});
