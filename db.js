var DataStore = require('nedb'),
    Q = require('q');

// initialize database
var dataStore = new DataStore({
  filename: __dirname + '/info.db',
  autoload: true
});

function insert(doc) {
  var deferred = Q.defer();
  dataStore.insert(doc, function(err, newDoc){
    deferred.resolve(newDoc);
  });
  return deferred.promise;
}

function queryAll() {
  var deferred = Q.defer();
  dataStore.find({}, function(err, docs) {
    deferred.resolve(docs);
  });
  return deferred.promise;
}

module.exports = {
  insert: insert,
  queryAll: queryAll
};