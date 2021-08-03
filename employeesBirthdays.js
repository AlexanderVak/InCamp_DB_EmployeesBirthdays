import moment from 'moment';
import 'moment/locale/uk.js';

export function age(employee){
    let today = moment()
    let birthday = employee.birthday
    let age = today.diff(birthday, 'years')
    return age
}

export function employeesGroupedByMonths(input){
    const employees = new Map()

    input.forEach(employee => {
        if (employees.has(employee.birthday.month())) {
            employees.get(employee.birthday.month()).push(employee)

        } else {
            employees.set(employee.birthday.month(),[employee])
        }
    });

    return employees
}
export function employeesSortedByDay(employees) {
    employees.forEach((employeesByMonth) => employeesByMonth.sort((a, b) => a.birthday.day() - b.birthday.day()))
    return employees
}
export function planningHorizon(horizon, employees) {
    let currentMonth = moment().month()
    switch (horizon) {
        case 0:
            return employees.get(currentMonth)
        case 1:
            return [employees.get(currentMonth), employees.get(currentMonth + 1)]
        case 2:
            return [employees.get(currentMonth), employees.get(currentMonth + 1), employees.get(currentMonth + 2)]    
        default:
            break;
    }
}
function pluralize(age, one, few, many) {
    let num = 0
    if(age >= 20)
        num = age % 10
        
    switch (true) {
        case num === 0:
            return `${age} ${few}`
        case num >= 2 && num <= 4:
            return `${age} ${many}`
        case num >= 5 && num <= 19:
            return `${age} ${few}`
        default:
            return `${age} ${one}`
    }
}
export function showListOfEmployeesBirthdays(employees){
    let currentDate = moment()
    let futureDate = moment()
    let innerText = ''
    let result = ''
    for (let i = 0; i < employees.length; i++) {
        for (let j = 0; j < employees[i].length; j++) {
            innerText += `(${employees[i][j].birthday.format("D")}) - ${employees[i][j].name} (${pluralize(age(employees[i][j]), 'рік', 'років', 'роки')})\n`            
        }
        result += `${futureDate.format("MMMM YYYY")}\n` + innerText
        innerText = ''
        futureDate = moment(currentDate).add(1, 'M');
        currentDate = futureDate
    }
    return result

}