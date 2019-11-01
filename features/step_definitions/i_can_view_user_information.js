import promise             from "bluebird"
import {Given, Then, When} from 'cucumber'
import uuidV4              from 'uuid/v4'


Given('A website called {string}', function (website_url, callback) {
	if (this.websites.find(w => w.website_url === website_url)) {
		this.user.web_address_id=this.websites.find(w => w.website_url === website_url).uuid
	} else {
		let uuid=uuidV4()
		this.websites.push({
												 website_url,
												 uuid
											 })
		this.user.web_address_id=uuid
	}
	callback()
})


Given('a user with username as {string}', function (user_id, callback) {
	this.user.user_id=user_id
	callback()
})

Given('A user with a password as {string}', function (password, callback) {
	this.user.password=password
	callback()
})

Given('The user has a preference setting {string} and {string}', function (type, value, callback) {
	let type_id=null
	if (this.web_preference_type_list.find(w => w.description === type)) {
		type_id=this.web_preference_type_list.find(w => w.description === type).id
		this.user.web_user_preferences.push({
																					web_preference_type_id: type_id,
																					value
																				})
		callback()
	} else {
		this.db.one("insert into web_preference_type (description) values ($1) returning id", [type])
			.then(data => {
				this.web_preference_type_list.push({
																						 id         : data.id,
																						 description: type
																					 })
				this.user.web_user_preferences.push({
																							value,
																							web_preference_type_id: data.id
																						})
				callback()
			})

	}

})

Given('a login account history from {string} thru {string} a user id of {string} a password of {string}', function (active_from, active_thru, user_id, password, callback) {
	this.user.login_account_history.push({
																				 active_from,
																				 active_thru,
																				 user_id,
																				 password
																			 })
	callback()
})

Given('The user is in the database.', function () {
	this.user.party_id=uuidV4()
	return this.db.one("insert into user_login(user_id, password, party_id, web_address_id) values($1, $2, $3, $4) returning id", [this.user.user_id, this.user.password, this.user.party_id, this.user.web_address_id])
		.then(data => this.user.id=data.id)
		.then(() => promise.all(
			this.user.web_user_preferences.map(i => this.db.none("insert into web_user_preference (value, user_login_id, web_preference_type_id) values ($1, $2, $3)", [i.value, this.user.id, i.web_preference_type_id]))))
		.then(() => promise.all(
			this.user.login_account_history.map(i => this.db.none("insert into login_account_history (user_login, user_id, password, active_from, active_thru) values ($1, $2, $3, $4, $5)", [this.user.id, i.user_id, i.password, i.active_from, i.active_thru]))))
		.then(() => this.user_list.push(this.user))
		.then(() => this.user={
			user_id              : '',
			party_id             : '',
			password             : null,
			web_address_id       : '',
			web_user_preferences : [],
			login_account_history: []
		})
})

When('I view the list of users', function () {
	return this.db.any("select id, user_id, party_id, web_address_id from user_login order by user_id")
		.then(data => this.result.data=data)
		.catch(error => this.result.error=error)

})

Then('I see user id {string}', function (user_id, callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok

	expect(this.result.data.map(d => d.user_id)).to.include(user_id)
	callback()
})

Then('I see the party record', function (callback) {
	expect(this.result.error).to.not.be.ok
	expect(this.result.data).to.be.ok
	expect(this.result.data.map(d => d.party_id)).to.have.members(this.user_list.map(ul => ul.party_id))
	callback()
})


