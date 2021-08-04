import { age, employeesGroupedByMonths, employeesSortedByDay, planningHorizon, employeesBirthdaysToString} from './employeesBirthdays.js'
import moment from 'moment';

const input = [
    { name: 'Джорно Джованна', birthday: moment('2000-04-16') },
    { name: 'Джозеф Джостар', birthday: moment('1996-09-27') },
    { name: 'Куджо Джотаро', birthday: moment('2000-05-10') },
    { name: 'Джонатан Джостар', birthday: moment("1986-04-04")},
    { name: 'Бруно Бучаратті', birthday: moment('2000-07-22') },
    { name: 'Діо Брандо', birthday: moment('1986-08-12') },
    { name: 'Роберт Спідвагон', birthday: moment('1985-08-16')},
    { name: 'Чезаре Зепеллі', birthday: moment('1996-10-25')},
    { name: 'Жан П`єр Польнареф', birthday: moment('2000-10-03')}
]

describe('employee birthdays', () => {
    it('should show employee`s birthday', () => {
        expect(`${input[3].name} ${input[3].birthday.format("D MMMM")}`).toBe('Джонатан Джостар 4 квітня')                        
    });
    it('should get employee`s age', () => {
        expect(age(input[3])).toBe(35)
    });
    it('should group employees by months', () => {
        expect(employeesGroupedByMonths(input).get(3)).toEqual([input[0], input[3]])
    });
    it('should show employees by current month', () => {
        expect(employeesGroupedByMonths(input).get(6)).toEqual([input[4]])
    });
    it('should sort employees by day of birth in curr month', () => {
        expect(employeesSortedByDay(employeesGroupedByMonths(input)).get(7)).toEqual([input[5], input[6]])
    });
    it('should return employees by planning horizon 2', () => {
        expect(planningHorizon(2, employeesSortedByDay(employeesGroupedByMonths(input)))).toEqual([
            [input[5],input[6]],
            [input[1]],
            [input[8],input[7]]
        ])
    });
    it('should return group employees with same birthday month', () => {
        expect(employeesBirthdaysToString(planningHorizon(2, employeesSortedByDay(employeesGroupedByMonths(input))))).toEqual('серпень 2021\n(12) - Діо Брандо (34 роки)\n(16) - Роберт Спідвагон (35 років)\nвересень 2021\n(27) - Джозеф Джостар (24 роки)\nжовтень 2021\n(3) - Жан П`єр Польнареф (20 років)\n(25) - Чезаре Зепеллі (24 роки)\n')
    });

});