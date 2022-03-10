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
    });

    it('increment 5 times', async function () {
        const btn = component.find("#btnIncrement");
        console.log('btn', btn);
        for (let i = 0; i < 1; i++) {
            btn.click();
        }
        // await component.waitFor('update');
        // expect(component['counter']).equal(5);
    });
});

