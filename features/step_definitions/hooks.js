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
      this.db.any("delete from function_type")
      .then(() => this.db.any("delete from visit"))
      .then(() => this.db.any("delete from web_content_role_type"))
      .then(() => this.db.any("delete from web_content_status_type"))
      .then(() => this.db.any("delete from web_content_type"))
      .then(() => this.db.any("delete from web_user_preference"))
      .then(() => this.db.any("delete from web_preference_type"))
      .then(() => this.db.any("delete from login_account_history"))
      .then(() => this.db.any("delete from user_login"))
      .then((data) => callback())
      .catch((error) => callback(error));
    });

    After(function() {});
});
