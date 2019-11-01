import {Given, Then, When} from 'cucumber'

Given('I have provided a web preference type called {string}', function (web_preference_type, callback) {
	this.web_preference_type=web_preference_type
	callback()
})

Given('a web preference type exists called {string}', function (web_preference_type) {
	return this.db.one("insert into web_preference_type (description) values ($1) returning id", [web_preference_type])
		.then((data) => this.exisiting_web_preference_id=data.id)
})

When('I save the web preference type', function () {
	return this.db.one("insert into web_preference_type (description) values ($1) returning id", [this.web_preference_type])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I retrieve a list of web preferences', function () {
	return this.db.any("select id, description from web_preference_type")
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I update the web preference to {string},', function (web_preference) {
	return this.db.none("update web_preference_type set description = $1 where id = $2", [web_preference, this.exisiting_web_preference_id])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I delete a web preference type', function () {
	return this.db.none("delete from web_preference_type where id = $1",
											[this.exisiting_web_preference_id])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

Then('the web preference type is in the database', function () {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok
	return this.db.one("select id, description from web_preference_type where id = $1", [this.result.data.id])
		.then((data) => {
			expect(data.description).to.be.equal(this.web_preference_type)
		})
})

Then('I get an error message', function (callback) {
	expect(this.result.error).to.be.ok
	expect(this.result.data).to.not.be.ok
	callback()
})

Then('the web preference list contains {string}', function (web_preference_type, callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok
	expect(this.result.data.map((d) => d.description)).to.include(web_preference_type)
	callback()
})

Then('the web preference value in the database is {string}', function (web_preference_value) {
	return this.db.one("select id, description from web_preference_type where id = $1", [this.exisiting_web_preference_id])
		.then((data) => {
			expect(data.description).to.be.equal(web_preference_value)
		})
})

Then('the web preference type called {string} does not exist', function (web_preference_type) {
	return this.db.one("select id, description from web_preference_type where description = $1", [web_preference_type])
		.then((data) => {
			expect(data.description).to.be.equal(web_preference_value)
		})
		.catch((error) => {
			expect(error.message).to.be.equal('No data returned from the query.')
		})
})

