var records = [
    { id: 1, username: 'panasonic', password: 'na', displayName: 'david', emails: [ { value: 'david@wizr.com' } ] },
    { id: 2, username: 'wizr', password: 'na', displayName: 'donny', emails: [ { value: 'donny@wizr.com' } ] },
    { id: 3, username: 'panasonic', password: 'na', displayName: 'david', emails: [ { value: 'panasonic@wizr.com' } ] },
    { id: 4, username: 'milestone', password: 'na', displayName: 'david', emails: [ { value: 'milestone@wizr.com' } ] },
    { id: 5, username: 'eagleeye', password: 'na', displayName: 'david', emails: [ { value: 'eagleeye@wizr.com' } ] },
    { id: 6, username: 'adt', password: 'na', displayName: 'david', emails: [ { value: 'adt@wizr.com' } ] },
    { id: 7, username: 'netgear', password: 'na', displayName: 'david', emails: [ { value: 'netgear@wizr.com' } ] },
    { id: 8, username: 'pelco', password: 'na', displayName: 'david', emails: [ { value: 'pelco@wizr.com' } ] },  
    { id: 9, username: 'comcast', password: 'na', displayName: 'david', emails: [ { value: 'comcast@wizr.com' } ] }, 
    { id: 10, username: 'adtadt', password: 'na', displayName: 'david', emails: [ { value: 'adt@wizr.com' } ] }    
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
