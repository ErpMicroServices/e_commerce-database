const pgp=require('pg-promise')()
import * as moment from 'moment'
import config      from "./config"


const types          =pgp.pg.types
const TIMESTAMPTZ_OID=1184
const TIMESTAMP_OID  =1114
const parseFn        =function (val) {
	return val === null ? null : moment.utc(val).format()
}
types.setTypeParser(TIMESTAMPTZ_OID, parseFn)
types.setTypeParser(TIMESTAMP_OID, parseFn)

const database=pgp(config.database)

export default database
