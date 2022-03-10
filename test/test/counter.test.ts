import Counter from "../src/components/counter.mahal";
import { app } from "../src/index";
import { expect } from "chai";
import { initiate } from "mahal-test-utils";

describe('Counter', function () {

    let component: Counter;

    before(async function () {
        component = await initiate.call(app, Counter);
    });

    it('check initial value of counter', function () {
        expect(component['counter']).equal(0);
        const counter = component.find('#divCounter');
        // console.log('counter', counter);
        expect(counter.innerHTML).equal('0');
        expect(component.find('#divCounter5').innerHTML).equal('5');
        expect(component.find('#divCounter').innerHTML).equal('0');
    });

    it('increment 5 times', async function () {
        const btn = component.find("#btnIncrement");
        for (let i = 0; i < 5; i++) {
            btn.click();
        }
        await component.waitFor('update');
        expect(component['counter']).equal(5);
        expect(component.find('#divCounter5').innerHTML).equal('10');
        expect(component.find('#divCounter').innerHTML).equal('5');
    });

    it('decrement', async function () {
        const btn = component.find("#btnDecrement");
        btn.click();
        await component.waitFor('update');
        expect(component['counter']).equal(4);
        expect(component.find('#divCounter5').innerHTML).equal('9');
        expect(component.find('#divCounter').innerHTML).equal('4');
    });
});

