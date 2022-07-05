import Student from "../src/components/students.mahal";
import { expect } from "chai";
import { mount, setInputValue } from "mahal-test-utils";
import { app } from "../src";

describe('Student', function () {

    let component: Student;

    before(async () => {
        const mountWithBind: typeof mount = mount.bind(app);
        component = await mountWithBind<Student>(Student);
    });

    it('check rows', function () {
        const table = component.element;
        const rows = table.querySelectorAll('tr');
        expect(rows).length(2);
        const colsTh = rows[0].querySelectorAll('th');
        expect(colsTh).length(4);
        const cols = rows[1].querySelectorAll('td');
        expect(cols).length(6);
    });

    it('add student', async function () {
        const table = component.element;
        let rows = table.querySelectorAll('tr')
        const row = rows[1];
        const name = row.querySelectorAll('td')[0].querySelector('input') as HTMLElement;
        const gender = row.querySelectorAll('td')[1].querySelector('input') as HTMLElement;
        const country = row.querySelectorAll('td')[2].querySelector('input') as HTMLElement;
        const city = row.querySelectorAll('td')[3].querySelector('input') as HTMLElement;
        const data = {
            name: 'ujjwal',
            gender: 'male',
            country: 'india',
            city: 'bangalore',
            id: 1,
            // isN
        }
        setInputValue(name, data.name);
        setInputValue(gender, data.gender);
        setInputValue(country, data.country);
        setInputValue(city, data.city);
        const btnAdd = row.querySelectorAll('td')[4].querySelector('button') as HTMLElement;

        btnAdd.click();
        await component.waitFor('update');



        rows = table.querySelectorAll('tr');
        const students = component.getState('students');
        expect(rows).length(3);
        expect(students).length(1);

        expect(students[0]).eql(data);
    });

    it('edit student', async function () {
        const table = component.element;
        let rows = table.querySelectorAll('tr')
        let row = rows[2];
        const btnEdit = row.querySelector('.edit') as HTMLButtonElement;
        btnEdit.click();
        await component.waitFor('update');
        rows = table.querySelectorAll('tr')
        row = rows[2];
        // console.log('row', row.outerHTML);
        const name = row.querySelectorAll('td')[0].querySelector('input') as HTMLElement;
        const gender = row.querySelectorAll('td')[1].querySelector('input') as HTMLElement;
        const country = row.querySelectorAll('td')[2].querySelector('input') as HTMLElement;
        const city = row.querySelectorAll('td')[3].querySelector('input') as HTMLElement;
        const data = {
            name: 'ujjwal gupta',
            gender: 'MALE',
            country: 'India',
            city: 'Bangalore',
            id: 1,
            // isN
        }
        setInputValue(name, data.name);
        setInputValue(gender, data.gender);
        setInputValue(country, data.country);
        setInputValue(city, data.city);

        const btnUpdate = row.querySelectorAll('td')[4].querySelector('button') as HTMLElement;

        btnUpdate.click();
        await component.waitFor('update');
        rows = table.querySelectorAll('tr');
        row = rows[2];
        const deleteButton = row.querySelector('button.delete')
        expect(deleteButton).to.not.be.null;
        rows = table.querySelectorAll('tr');
        const students = component.getState('students');
        expect(rows).length(3);
        expect(students).length(1);

        expect(students[0]).eql(data);
    });

    it('delete student', async function () {
        const table = component.element;
        let rows = table.querySelectorAll('tr')
        let row = rows[2];
        const btnDelete = row.querySelector('.delete') as HTMLButtonElement;
        console.log('btnDelete', row.innerHTML);
        btnDelete.click();
        await component.waitFor('update');
        rows = table.querySelectorAll('tr')
        row = rows[2];

        const students = component.getState('students');
        expect(rows).length(2);
        expect(students).length(0);

    });

    // it('click on input add student', async function () {
    //     const input = component.find('.input-container input');
    //     setInputValue(input, 'hello world');
    //     const button = component.find('.input-container button') as HTMLElement;
    //     button.click();

    //     await component.waitFor('update');

    //     const rows = component.find('table').querySelectorAll('tr');
    //     expect(rows).length(3);

    //     const cols = rows[2].querySelectorAll('td');
    //     expect(cols).length(2);
    //     expect(cols[0].innerHTML).equal(component.students[2].name);
    // });
});

