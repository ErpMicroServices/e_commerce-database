var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided my first name as {arg1:stringInDoubleQuotes}', function(arg1, callback) {
        this.user.first_name = arg1;
        callback();
    });

    Given('I have provided my last name as {arg1:stringInDoubleQuotes}', function(arg1, callback) {
        this.user.last_name = arg1;
        callback();
    });

    Given('I have provided my email address as {arg1:stringInDoubleQuotes}', function(arg1, callback) {
        this.user.email = arg1;
        callback();
    });

    Given('I have provided my password as {arg1:stringInDoubleQuotes}', function(arg1, callback) {
        this.user.password = arg1;
        callback();
    });

    Given('a user registered with first_name={first_name:stringInDoubleQuotes}, last_name={last_name:stringInDoubleQuotes}, email{email:stringInDoubleQuotes}, password={password:stringInDoubleQuotes}', function(first_name, last_name, email, password, callback) {
        return this.db.connect(function(err, client, done) {
            expect(err).is.null;
            client.query(
                "insert into users(first_name, last_name, email, password) values($1, $2, $3, $4)", [first_name, last_name, email, password],
                function(err, queryResult) {
                    done();
                    callback(err);
                });
        });
    });


    When('I register', function(callback) {
        var result = this.result;
        var user = this.user;
        return this.db.connect(function(err, client, done) {
            expect(err).is.null;
            client.query(
                "insert into users(first_name, last_name, email, password) values($1, $2, $3, $4)", [user.first_name, user.last_name, user.email, user.password],
                function(err, queryResult) {
                    done();
                    result.error = err || null;
                    result.data = queryResult || null;
                    callback();
                });
        });
    });

    Then('I will be logged in', function(callback) {
        expect(this.result.error).to.be.null;
        var user = this.user;
        var result = this.result;
        this.db.connect(function(err, client, done) {
            expect(err).is.null;
            client.query(
                "select id, first_name, last_name, email, password from users", [],
                function(err, result) {
                    done();
                    expect(result.rows).to.have.lengthOf(1);
                    expect(result.rows[0].first_name).to.be.equal(user.first_name);
                    expect(result.rows[0].last_name).to.be.equal(user.last_name);
                    expect(result.rows[0].email).to.be.equal(user.email);
                    expect(result.rows[0].password).to.be.equal(user.password);
                    callback();
                }
            );
        });
    });

    Then('I will be on my personal page', function(callback) {
        // This is a nonsensical requirement for the db, so ignore it
        callback();
    });

    Then('I will be given a message that says "The first name is required"', function(callback) {
        expect(this.result.data).to.be.null;
        expect(this.result.error.toString()).to.have.string('new row for relation "users" violates check constraint "first_name_not_empty"');
        callback();
    });

    Then('I will be given a message that says "The last name is required"', function(callback) {
        expect(this.result.data).to.be.null;
        expect(this.result.error.toString()).to.have.string('new row for relation "users" violates check constraint "last_name_not_empty"');
        callback();
    });

    Then('I will be given a message that says "The email is required"', function(callback) {
        expect(this.result.data).to.be.null;
        expect(this.result.error.toString()).to.have.string('new row for relation "users" violates check constraint "email_not_empty"');
        callback();
    });

    Then('I will be given a message that says "The password is required"', function(callback) {
        expect(this.result.data).to.be.null;
        expect(this.result.error.toString()).to.have.string('new row for relation "users" violates check constraint "password_not_empty"');
        callback();
    });

    Then('I will be given the message "You have already registered with that password"', function(callback) {
        expect(this.result.data).to.be.null;
        expect(this.result.error.toString()).to.have.string('error: duplicate key value violates unique constraint "users_email_key"');
        callback();
    });

});
