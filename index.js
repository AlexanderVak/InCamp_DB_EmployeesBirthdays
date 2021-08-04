import Client from "pg-pool"
import moment from 'moment';
import 'moment/locale/uk.js';
import { employeesGroupedByMonths, employeesSortedByDay, planningHorizon, employeesBirthdaysToString } from "./employeesBirthdays.js"

const client = new Client({
    user: 'employees_app',
    database: 'employees',
    password: 'password'
})

let employees = []

export async function selectFrom(){
    await client.connect()
    const res = await client.query('SELECT * FROM employees')
    for (const row of res.rows) {
        row.birthday = moment(row.birthday)
        employees.push(row);
    }
    return employees
    await client.end()
}





