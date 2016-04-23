# labelstore

![Travis CI](https://travis-ci.org/joshgordon/labelstore.svg?branch=master)

This is a straightforward REST API for storing keys and values. The idea
is that if you have a webapp on an embedded device that has read only memory
In my case, the raspberry pi running my 
[pyrelay](https://github.com/joshgordon/pyRelay)  box has its root
filesystem mounted read-only for stability. 

By using this and accessing it through CORS, I can add labels to the web UI
without having to add read-write on my raspberry pi. 

# API

* `GET` `/:namespace/:key`
> Gets the key in the namespace.

* `PUT` `/:namespace/:key`
> Update or set the key in the namespace

* `GET` `/:namespace/:key`
> Get all of the keys in a namespace.
