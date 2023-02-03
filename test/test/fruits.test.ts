import FruitComponent from "../src/components/fruits.mahal";
import { app } from "../src/index";
import { clone } from "./utils";
import { expect } from "chai";
import { mount } from "@mahaljs/test-utils";

describe('Fruits', function () {

    let component: FruitComponent;

    const events = {
        'fruits': 0,
        'expression.fruitsLength': 0,
        'expression.fruitsAsObject': 0
    };

    before(async function () {
        for (const key in events) {
            events[key] = app.global.store.__watchBus__._events[key]?.size || 0
        }
        const mountWithBind: typeof mount = mount.bind(app);
        component = await mountWithBind(FruitComponent);
    });

    const checkFruitValue = (value) => {
        const rows = component.findAll('p');
        expect(value).length(rows.length);
        expect(component.getState('fruitsLength')).equal(rows.length);
        value.forEach((fruit, index) => {
            expect(rows[index].innerHTML).equal(`${index}-${fruit}`)
        })

        const obj = {};
        value.forEach(fruit => {
            obj[fruit] = fruit;
        });
        expect(component.getState('fruitsAsObject')).eql(obj);
    }

    it("check rendered value", function () {
        console.log("fruits", component['initialFruits']);
        checkFruitValue(component['initialFruits']);
    })

    it("push", async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].push('ddd', 'amrud');
        await component.waitFor('update');
        const fruits = component['initialFruits'];
        fruits.push('ddd', 'amrud');
        checkFruitValue(fruits);
    })

    it("update", async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'][0] = 'ff';
        await component.waitFor('update');
        const fruits = component['initialFruits'];
        fruits[0] = 'ff';
        checkFruitValue(fruits);
    })

    it("splice value by 0,1", async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].splice(0, 1);
        await component.waitFor('update');
        const fruits = component['initialFruits'];
        fruits.splice(0, 1);
        checkFruitValue(fruits);
    })

    it("splice value by 2,1", async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].splice(2, 1);
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.splice(2, 1);
        checkFruitValue(fruits);
    })

    it(`splice value by 2,1, "Lemon", "Kiwi" `, async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].splice(2, 1, "Lemon", "Kiwi");
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.splice(2, 1, "Lemon", "Kiwi");
        checkFruitValue(fruits);
    })

    it(`splice value by 2,0, "Lemon", "Kiwi" `, async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].splice(2, 0, "Lemon", "Kiwi");
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.splice(2, 0, "Lemon", "Kiwi");
        checkFruitValue(fruits);
    })

    it(`splice value by 2,2, "Lemon", "Kiwi" `, async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].splice(2, 2, "Lemon", "Kiwi");
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.splice(2, 2, "Lemon", "Kiwi");
        checkFruitValue(fruits);
    })

    it('pop items', async () => {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].pop();
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.pop();
        checkFruitValue(fruits);
    });

    it('shift items', async () => {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].shift();
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.shift();
        checkFruitValue(fruits);
    });

    it('unshift items', async () => {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].unshift('amrud');
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.unshift('amrud');
        checkFruitValue(fruits);
    });

    it('reverse items', async () => {
        component['setInitial']();
        await component.waitFor('update');
        component['fruits'].reverse();
        await component.waitFor('update');
        const fruits = clone(component['initialFruits']);
        fruits.reverse();
        checkFruitValue(fruits);
    });

    it('component destroy', async () => {
        component['destroyEl']();
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

