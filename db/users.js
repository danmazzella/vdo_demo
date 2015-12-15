var records = [
    { id: 1, username: 'panasonic', password: 'na', displayName: 'david', emails: [ { value: 'david@wizr.com' } ] },
    { id: 2, username: 'wizr', password: 'na', displayName: 'donny', emails: [ { value: 'donny@wizr.com' } ] },
    { id: 2, username: 'sanjeev', password: 'na', displayName: 'donny', emails: [ { value: 'sanjeev@wizr.com' } ] },
    { id: 2, username: 'nader', password: 'na', displayName: 'donny', emails: [ { value: 'sanjeev@wizr.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}