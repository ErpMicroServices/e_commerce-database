var {
    defineSupportCode
} = require('cucumber');

import moment from "moment";

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided a web content status type called {web_content_status_type:stringInDoubleQuotes}', function(web_content_status_type, callback) {
        this.web_content_status_type = web_content_status_type;
        callback();
    });

    Given('a web content status type exists called {web_content_status_type:stringInDoubleQuotes}', function(web_content_status_type) {
        return this.db.one("insert into web_content_status_type (description) values ($1) returning id", [web_content_status_type])
            .then((data) => this.exisiting_web_content_status_type_id = data.id);
    });

    When('I save the web content status type', function() {
        return this.db.one("insert into web_content_status_type (description) values ($1) returning id", [this.web_content_status_type])
            .then((data) => this.result.data = data)
            .catch((error) => this.result.error = error)
    });

    When('I retrieve a list of web content status types', function() {
        return this.db.any("select id, description from web_content_status_type")
            .then((data) => this.result.data = data)
            .catch((error) => this.result.error = error)
    });

    When('I update the web content status type to {web_content_status_type:stringInDoubleQuotes},', function(web_content_status_type) {
        return this.db.none("update web_content_status_type set description = $1 where id = $2", [web_content_status_type, this.exisiting_web_content_status_type_id])
            .then((data) => this.result.data = data)
            .catch((error) => this.result.error = error);
    });

    When('I delete a web content status type', function() {
        return this.db.none("delete from web_content_status_type where id = $1", [this.exisiting_web_content_status_type_id])
            .then((data) => this.result.data = data)
            .catch((error) => this.result.error = error);
    });

    Then('the web content status type is in the database', function() {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        return this.db.one("select id, description from web_content_status_type where id = $1", [this.result.data.id])
            .then(data => expect(data.description).to.be.equal(this.web_content_status_type))
    });

    Then('I get an error message about duplicate web content status types', function(callback) {
        expect(this.result.error).to.be.ok;
        expect(this.result.data).to.not.be.ok;
        callback();
    });

    Then('the web content status type list contains {web_content_status_type:stringInDoubleQuotes}', function(web_content_status_type, callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.map((d) => d.description)).to.include(web_content_status_type)
        callback();
    });

    Then('the web content status type value in the database is {web_content_status_type_value:stringInDoubleQuotes}', function(web_content_status_type_value) {
        return this.db.one("select id, description from web_content_status_type where id = $1", [this.exisiting_web_content_status_type_id])
            .then((data) => {
                expect(data.description).to.be.equal(web_content_status_type_value);
            });
    });

    Then('the web content status type called {web_content_status_type:stringInDoubleQuotes} does not exist', function(web_content_status_type) {
        return this.db.none("select id, description from web_content_status_type where description = $1", [web_content_status_type])
            .then((data) => {
              console.log("data: ", data);
                expect(data).to.not.be.ok;
            });
    });
});
