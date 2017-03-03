var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided my username as {email:stringInDoubleQuotes}', function(email, callback) {
        this.user.user_id = email;
        callback();
    });

    Given('I have provided my password as {password:stringInDoubleQuotes}', function(password, callback) {
        this.user.password = password;
        callback();
    });

    Given('a user registered with username = {user_id:stringInDoubleQuotes}, password = {password:stringInDoubleQuotes}', function(user_id, password) {
        return this.db.one("insert into user_login(user_id, password) values($1, $2) returning id", [user_id, password]);
    });


    When('I register', function() {
        return this.db.one("insert into user_login(user_id, password) values($1, $2) returning id", [this.user.user_id, this.user.password])
            .then((data) => this.result.data = data)
            .catch((error) => this.result.error = error)

    });

    When('I login', function() {
        this.db.one("select id, user_id, password from user_login where user_id = $1 and password=$2", [this.user.user_id, this.user.password])
            .then((response) => this.result.data = response)
            .catch((error) => this.error = error)

    });

    When('I logout', function() {
         this.result.data = {};
         this.result.error= {};
    });

    Then('I will be logged in', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        callback();
    });

    Then('I will be given a message that says "The username is required"', function(callback) {
          expect(this.result.error).to.be.ok;
          expect(this.result.data).to.not.be.ok;
          expect(this.result.error.message).to.be.equal('new row for relation "user_login" violates check constraint "user_id"');
          callback();
    });

    Then('I will be given a message that says "The password is required"', function(callback) {
        expect(this.result.error).to.be.ok;
        expect(this.result.data).to.not.be.ok;
        expect(this.result.error.message).to.be.equal('new row for relation "user_login" violates check constraint "password_not_empty"');
        callback();
      });

    Then('I will be given the message "You have already registered with that username"', function(callback) {
      expect(this.result.error).to.be.ok;
      expect(this.result.data).to.not.be.ok;
      expect(this.result.error.message).to.be.equal('duplicate key value violates unique constraint "user_login_user_id_key"');
        callback();
    });

    Then('I am logged out', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.not.be.ok;

        callback();
    });


});
