// features/support/world.js
import config from "./config";
import database from "./database";

var {
    defineSupportCode
} = require('cucumber');

function CustomWorld() {
    this.config = config;
    this.db = database;
    this.user = {
        user_id: '',
        party_id: '',
        password: null,
        web_address_id: '',
        web_user_preferences: [],
        login_account_history: []
    };

    this.websites = [];

    this.user_list = [];
    this.web_preference_type_list = [];
    this.result = {
        error: null,
        data: null
    };
    this.exisiting_web_preference_id = null;
    this.web_preference_type = null;
    this.exisiting_function_type_id = null;
    this.function_type = null;
}

defineSupportCode(function({
    setWorldConstructor
}) {
    setWorldConstructor(CustomWorld)
});
