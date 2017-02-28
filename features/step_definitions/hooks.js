// features/step_definitions/hooks.js
var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Before,
    After
}) {
    Before(function() {
        this.db.connect(function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query("delete from users", [], function(err, result) {
                done();

                if (err) {
                    return console.error('error running query', err);
                }                
            });
        })
    })
    After(function() {
        this.pg.end();
    });
});
