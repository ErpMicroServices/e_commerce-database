import {Given, Then, When} from 'cucumber'

Given('I have provided a function type called {string}', function (function_type, callback) {
	this.function_type=function_type
	callback()
})

Given('a function type exists called {string}', function (function_type) {
	return this.db.one("insert into function_type (description) values ($1) returning id", [function_type])
		.then((data) => this.exisiting_function_type_id=data.id)
})

When('I save the function type', function () {
	return this.db.one("insert into function_type (description) values ($1) returning id", [this.function_type])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I retrieve a list of functions', function () {
	return this.db.any("select id, description from function_type")
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I update the function to {string},', function (function_type) {
	return this.db.none("update function_type set description = $1 where id = $2", [function_type, this.exisiting_function_type_id])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

When('I delete a function type', function () {
	return this.db.none("delete from function_type where id = $1", [this.exisiting_function_type_id])
		.then((data) => this.result.data=data)
		.catch((error) => this.result.error=error)
})

Then('the function type is in the database', function () {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok
	return this.db.one("select id, description from function_type where id = $1", [this.result.data.id])
		.then(data => expect(data.description).to.be.equal(this.function_type))
})

Then('I get an error message about duplicate function types', function (callback) {
	expect(this.result.error).to.be.ok
	expect(this.result.data).to.not.be.ok
	callback()
})

Then('the function list contains {string}', function (function_type, callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok
	expect(this.result.data.map((d) => d.description)).to.include(function_type)
	callback()
})

Then('the function value in the database is {string}', function (function_type_value) {
	return this.db.one("select id, description from function_type where id = $1", [this.exisiting_function_type_id])
		.then((data) => {
			expect(data.description).to.be.equal(function_type_value)
		})
})

Then('the function type called {string} does not exist', function (function_type) {
	return this.db.none("select id, description from function_type where description = $1", [function_type])
		.then((data) => {

			expect(data).to.not.be.ok
		})
})

