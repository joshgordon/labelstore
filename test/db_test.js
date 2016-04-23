import should from 'should';

import db from '../server/db.js';

let d = new db(':memory:');

const namespace='PYLIGHTS';
const keys = ['key1', 'key2'];
const values = ['value1', 'value2', 'value3'];

const endResult = [
  { 
    label: 'value3',
    key: 'key1'
  },
  {
    label: 'value2',
    key: 'key2'
  }
]


describe('db.js', () => {
  it('should be able to insert a record', (done) => {
    d.setLabel(namespace, keys[0], values[0]).then(() => {
      done();
    }, done);
  });

  it('should be able to insert another record', (done) => {
    d.setLabel(namespace, keys[1], values[1]).then(() => {
      done();
    }, done);
  });

  it('should be able to get the first record', (done) => {
    d.getLabel(namespace, keys[0]).then((record) => {
      try {
        record.should.equal(values[0]);
      } catch(e) {
        done(e);
        return;
      }
      done();
    });
  });

  it('should be able to get the second record', (done) => {
    d.getLabel(namespace, keys[1]).then((record) => {
      try {
        record.should.equal(values[1]);
      } catch(e) {
        done(e);
        return;
      }
      done();
    });
  });

  it('should be able to update a record', (done) => {
    d.setLabel(namespace, keys[0], values[2]).then(() => {
      done();
    }, done);
  });

  it('should have the newly updated record', (done) => {
    d.getLabel(namespace, keys[0]).then((record) => {
      try {
        record.should.equal(values[2]);
      } catch(e) {
        done(e);
        return;
      }
      done();
    }, done);
  });

  it('should be able to get all in a namespace', (done) => {
    d.getNamespace(namespace).then((labels) => {
      try {
        labels.should.deepEqual(endResult);
      } catch (e) {
        done(e);
        return;
      }
      done();
    }, done);
  });
  
}); 
