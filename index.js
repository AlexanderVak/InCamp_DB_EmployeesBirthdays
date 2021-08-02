import Pool from "pg-pool"

const pool = new Pool({
    user: 'employees_app',
    database: 'employees',
    password: 'password'
})

// pool.query('SELECT * FROM employees',(err, res) => {
//     if (err) {
//         throw err
//     }
//     for (const row of res.rows) {
//         console.log(row);    
//     }

// })

pool.query('select name from employees where extract (month from birthday)=4 ', (err, res) => {
    if (err) {
        throw err
    }
    for (const row of res.rows) {
        console.log(row);
    }
})

pool.query('select name, date_part(\'year\', age($1, birthday)) as age from employees', [new Date()], (err, res) => {
    if (err) {
        throw err
    }
    for (const row of res.rows) {
        console.log(row);
    }
})

pool.query('select name, date_part(\'day\', age($1, birthday)) as birthday from employees order by date_part(\'day\', age($1, birthday))', [new Date()], (err, res) => {
    if (err) {
        throw err
    }
    for (const row of res.rows) {
        console.log(row);
    }
})



