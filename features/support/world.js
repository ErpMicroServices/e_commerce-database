// features/support/world.js
var pg = require('pg');
var Pool = require("pg-pool");

var config = {
    host: 'localhost',
    database: 'EnterpriseKanban',
    user: 'EnterpriseKanban',
    password: 'EnterpriseKanban',
    max: 10,
    idleTimeoutMillis: 30000
}

var pool = new Pool(config);

var {
    defineSupportCode
} = require('cucumber');

function CustomWorld() {
    this.pg = pg;
    this.db = pool;
    this.user = {
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    };

    this.result = {
        error: null,
        data: null
    };
}

defineSupportCode(function({
    setWorldConstructor
}) {
    setWorldConstructor(CustomWorld)
})
