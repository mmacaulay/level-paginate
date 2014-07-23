var rimraf   = require('rimraf');
var level    = require('level');
var paginate = require('..');
var test     = require('tap').test;

test('paginate', function (t) {
  rimraf.sync(__dirname + '/db');
  var db = level(__dirname + '/db');

  prepare(db, function (err) {
    if (err) throw err;

    var page0 = [];

    paginate(db, 'post', { page : 0, num : 10 })
      .on('data', page0.push.bind(page0))
      .on('end', function () {
        t.deepEqual(page0, [
          {key:'post!119',value:'post!119'}, 
          {key:'post!118',value:'post!118'}, 
          {key:'post!117',value:'post!117'}, 
          {key:'post!116',value:'post!116'}, 
          {key:'post!115',value:'post!115'}, 
          {key:'post!114',value:'post!114'}, 
          {key:'post!113',value:'post!113'}, 
          {key:'post!112',value:'post!112'}, 
          {key:'post!111',value:'post!111'}, 
          {key:'post!110',value:'post!110'}
        ]);

        var page1 = [];

        paginate(db, 'post', { page : 1, num : 10 })
          .on('data', page1.push.bind(page1))
          .on('end', function () {
            t.deepEqual(page1, [
              {key:'post!109',value:'post!109'}, 
              {key:'post!108',value:'post!108'}, 
              {key:'post!107',value:'post!107'}, 
              {key:'post!106',value:'post!106'}, 
              {key:'post!105',value:'post!105'}, 
              {key:'post!104',value:'post!104'}, 
              {key:'post!103',value:'post!103'}, 
              {key:'post!102',value:'post!102'}, 
              {key:'post!101',value:'post!101'}, 
              {key:'post!100',value:'post!100'}
            ]);

            t.end();
          });
      });
  });
});


function prepare (db, cb) {
  var id = 100;
  var batch = [];
  for (var i = 0; i < 20; i++) {
    var key = 'post!' + id++;
    batch.push({ type : 'put', key : key, value : key });
  }
  db.batch(batch, cb);
}
