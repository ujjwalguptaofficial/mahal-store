import Counter from "../src/components/counter_with_flag.mahal";
import { app } from "../src/index";
import { expect } from "chai";
import { initiate, mount } from "@mahaljs/test-utils";

describe('Counter With Flag', function () {

    let component: Counter;

    before(async function () {
        app.global.store.set("count", 0);
        component = await mount.call(app, Counter);
    });

    it('check initial value of counter', function () {
        expect(component.find('#divCounter5').innerHTML).equal('5');
        expect(component.find('#divCounter').innerHTML).equal('0');
    });

    it('increment 5 times', async function () {
        const btn = component.find("#btnIncrement");
        for (let i = 0; i < 5; i++) {
            btn.click();
        }
        // await component.waitFor('update');
        await new Promise((res) => {
            setTimeout(res, 500);
        })
        expect(component.find('#divCounter5').innerHTML).equal('10');
        expect(component.find('#divCounter').innerHTML).equal('5');
    });

    it('decrement', async function () {
        const btn = component.find("#btnDecrement");
        btn.click();
        // await component.waitFor('update');
        await new Promise((res) => {
            setTimeout(res, 500);
        });
        expect(component.find('#divCounter5').innerHTML).equal('9');
        expect(component.find('#divCounter').innerHTML).equal('4');
    });

    it('set flag to false', async () => {
        component['flag'] = false;
        await component.waitFor('update');
        expect(component.find('#divCounter5')).to.be.null;
    })

    it('set flag to true', async () => {
        component['flag'] = true;
        await component.waitFor('update');
        expect(component.find('#divCounter5').innerHTML).equal('9');
        expect(component.find('#divCounter').innerHTML).equal('4');
    })

    it('decrement', async function () {
        const btn = component.find("#btnDecrement");
        btn.click();
        await new Promise((res) => {
            setTimeout(res, 500);
        });
        expect(component.find('#divCounter5').innerHTML).equal('8');
        expect(component.find('#divCounter').innerHTML).equal('3');
    });
});

