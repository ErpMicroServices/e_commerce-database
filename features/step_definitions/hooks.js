// features/step_definitions/hooks.js
import {Before} from 'cucumber'


Before(async function (result) {
	await this.db.any("delete from function_type")
	await this.db.any("delete from visit")
	await this.db.any("delete from web_content_role_type")
	await this.db.any("delete from web_content_status_type")
	await this.db.any("delete from web_content_type")
	await this.db.any("delete from web_user_preference")
	await this.db.any("delete from web_preference_type")
	await this.db.any("delete from login_account_history")
	await this.db.any("delete from user_login")

})

