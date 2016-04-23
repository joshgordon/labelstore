import sqlite3 from 'sqlite3';

import q from 'q';

export default function(dbname = 'database.db') {
  this.db = new sqlite3.Database(dbname);

  this.db.serialize(() => {
    this.db.run("CREATE TABLE IF NOT EXISTS labels(namespace text, key text, label text, UNIQUE(namespace, key));");
  });

  this.setLabel = (namespace, key, label) => {
    return q.promise((resolve, reject) => {
      this.db.run(
        "INSERT OR REPLACE INTO labels(namespace, key, label) VALUES(?, ?, ?)", 
        namespace, key, label, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  };

  this.getLabel = (namespace, key) => {
    return q.promise((resolve, reject) => {
      this.db.get("SELECT label FROM labels WHERE namespace=? AND key=?", namespace, key, (err, row) => {
        if (err) { 
          reject(err);
        } else if (row == null) {
          reject(404);  
        } else {
          resolve(row.label);
        }
      });
    });
  };

  this.getNamespace = (namespace) => {
    return q.promise((resolve, reject) => {
      this.db.all("SELECT label, key FROM labels WHERE namespace=?", namespace, (err, rows) => {
        if(err) {
          reject(err);
        } else if (rows == null) {
          reject(404);
        } else {
          resolve(rows);
        }
      });
    });
  };
};
