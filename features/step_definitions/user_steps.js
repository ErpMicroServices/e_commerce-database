import {Given, Then, When} from 'cucumber'
import moment              from "moment"
import uuidV4              from 'uuid/v4'


Given('I have provided my username as {string}', function (email) {
	this.user.user_id=email

})

Given('I have provided my password as {string}', function (password) {
	this.user.password=password

})

Given('a user registered with username = {string}, password = {string}', function (user_id, password) {
	this.user.party_id      =uuidV4()
	this.user.web_address_id=uuidV4()
	return this.db.one("insert into user_login(user_id, password, party_id, web_address_id) values($1, $2, $3, $4) returning id", [user_id, password, this.user.party_id, this.user.web_address_id])
		.then(() => this.db.one("insert into visit(from_date, cookie, web_address_id, visitor_id) values ($1, $2, $3, $4) returning id", [moment(), "cookie", this.user.web_address_id, this.user.party_id]))
		.catch(error => this.result.error=error)
})


When('I register', function () {
	this.user.party_id      =uuidV4()
	this.user.web_address_id=uuidV4()
	return this.db.one("insert into user_login(user_id, password, party_id, web_address_id) values($1, $2, $3, $4) returning id", [this.user.user_id, this.user.password, this.user.party_id, this.user.web_address_id])
		.then((data) => this.result.data=data)
		.then(() => this.db.one("insert into visit(from_date, cookie, web_address_id, visitor_id) values ($1, $2, $3, $4) returning id", [moment(), "cookie", this.user.web_address_id, this.user.party_id]))
		.catch((error) => this.result.error=error)

})

When('I login', function () {
	this.user.web_address_id=uuidV4()
	this.user.party_id      =uuidV4()
	this.db.one("select id, user_id, password from user_login where user_id = $1 and password=$2", [this.user.user_id, this.user.password])
		.then((response) => this.result.data=response)
		.then(() => this.db.one("insert into visit(from_date, cookie, web_address_id, visitor_id) values ($1, $2, $3, $4)", [moment(), "cookie", this.user.web_address_id, this.user.visitor_id]))
		.catch((error) => this.error=error)

})

When('I logout', function () {
	return this.db.one("select id, party_id from user_login where user_id = $1 ", [this.user.user_id])
		.then(data => this.db.none("update visit set thru_date = $1 where visitor_id = $2", [moment(), this.user.party_id]))

})

Then('I will be logged in', function (callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok

})

Then('I will be given a message that says {string}', function (callback) {
	expect(this.result.error).to.be.ok
	expect(this.result.data).to.not.be.ok
	expect(this.result.error.message).to.be.equal('new row for relation "user_login" violates check constraint "user_id"')

})


Then('I will be given the message {string}', function (callback) {
	expect(this.result.error).to.be.ok
	expect(this.result.data).to.not.be.ok
	expect(this.result.error.message).to.be.equal('duplicate key value violates unique constraint "user_login_user_id_key"')

})

Then('I am logged out', function (callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok


})

Then('the visit has ended', function () {
	return this.db.one("select id, from_date, thru_date, cookie, web_address_id, visitor_id from visit where visitor_id = $1", [this.user.party_id])
		.then(data => expect(data.thru_date).to.be.ok)
})

Then('a visit will be tied to my party id', function () {
	return this.db.one("select id, from_date, thru_date, cookie, web_address_id, visitor_id from visit where visitor_id = $1", [this.user.party_id])
		.then(data => {
			expect(data.from_date).to.be.ok
			expect(data.cookie).to.be.equal("cookie")
			expect(data.web_address_id).to.be.equal(this.user.web_address_id)
			expect(data.visitor_id).to.be.equal(this.user.party_id)
			expect(data.thru_date).to.not.be.ok
		})
})

