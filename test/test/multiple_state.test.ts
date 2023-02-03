import MultipleState from "../src/components/multiple_state.mahal";
import { app } from "../src/index";
import { expect } from "chai";
import { initiate, setInputValue } from "@mahaljs/test-utils";
import { removeEl } from "mahal";

describe('Counter', function () {

    let component: MultipleState;
    const events = {
        'firstName': 0,
        'lastName': 0,
        'expression.fullName': 0,
        'expression.fullNameInReverse': 0
    };

    before(async function () {
        for (const key in events) {
            events[key] = app.global.store.__watchBus__._events[key]?.size || 0
        }
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

    // it('check no of watch after', async () => {
    //     expect(
    //         Object.keys(component.global.store.__watchBus__._events)
    //     ).length(20);
    // })

    it('component destroy', async () => {
        removeEl(component.element);
        // await component.waitFor('update');
        await new Promise((res) => {
            setTimeout(res, 100);
        });
        const evs = app.global.store.__watchBus__._events;
        for (const key in events) {
            expect(events[key]).equal(evs[key].size)
        }
    })
});

