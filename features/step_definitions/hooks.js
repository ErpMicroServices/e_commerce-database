// features/step_definitions/hooks.js
import Promise from "bluebird";

var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
  Before,
  After
}) {

    Before(function(result, callback) {
      // Promise.all([
      this.db.any("delete from user_login")
      // ])
      .then((data) => callback())
      .catch((error) => callback(error));
    });

    After(function() {});
});
