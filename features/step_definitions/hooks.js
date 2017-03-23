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
      this.db.any("delete from user_login")
      .then(() => this.db.any("delete from web_preference_type"))
      .then(() => this.db.any("delete from function_type"))
      .then((data) => callback())
      .catch((error) => callback(error));
    });

    After(function() {});
});
