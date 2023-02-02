import MultipleState from "../src/components/multiple_state.mahal";
import { app } from "../src/index";
import { expect } from "chai";
import { initiate, setInputValue } from "@mahaljs/test-utils";

describe('Counter', function () {

    let component: MultipleState;

    before(async function () {
        component = await initiate.call(app, MultipleState);
    });

    it('check initial value of counter', function () {
        expect(component['firstName']).equal('');
        expect(component['lastName']).equal('');
        expect(component['fullName']).equal(' ');
        expect(component['fullNameInReverse']).equal(' ');


        expect(component.find('#divFirstName').innerHTML).equal('');
        expect(component.find('#divLastName').innerHTML).equal('');
        expect(component.find('#divFullName').innerHTML).equal(' ');
        expect(component.find('#divFullNameInReverse').innerHTML).equal(' ');
    });

    it('set first name and last name', async function () {

        component['setFirstName']('Ujjwal');
        component['setLastName']('Gupta');

        expect(component['firstName']).equal('Ujjwal');
        expect(component['lastName']).equal('Gupta');
        expect(component['fullName']).equal('Ujjwal Gupta');
        expect(component['fullNameInReverse']).equal('Gupta Ujjwal');

        await component.waitFor('update');

        expect(component.find('#divFirstName').innerHTML).equal('Ujjwal');
        expect(component.find('#divLastName').innerHTML).equal('Gupta');
        expect(component.find('#divFullName').innerHTML).equal('Ujjwal Gupta');
        expect(component.find('#divFullNameInReverse').innerHTML).equal('Gupta Ujjwal');
    });

    // it('decrement', async function () {
    //     const btn = component.find("#btnDecrement");
    //     btn.click();
    //     await component.waitFor('update');
    //     expect(component['counter']).equal(4);
    //     expect(component.find('#divCounter5').innerHTML).equal('9');
    //     expect(component.find('#divCounter').innerHTML).equal('4');
    // });

    // it('component destroy', () => {
    //     component.element.remove();
    // })
});

