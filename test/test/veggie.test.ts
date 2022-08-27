import FruitComponent from "../src/components/veggie.mahal";
import { app } from "../src/index";
import { expect } from "chai";
import { mount } from "@mahaljs/test-utils";

describe('Veggie', function () {

    let component: FruitComponent;

    before(async function () {
        const mountWithBind: typeof mount = mount.bind(app);
        component = await mountWithBind(FruitComponent);
    });

    const checkFruitValue = (value) => {
        const rows = component.findAll('p');
        const valueKeys = Object.keys(value);
        expect(valueKeys.length).equal(rows.length);
        expect(component.getState('veggieLength')).equal(rows.length);

        valueKeys.forEach((fruit, index) => {
            expect(rows[index].innerHTML).equal(`${fruit}-${value[fruit]}`)
        })
        expect(component.getState('veggieAsArray')).eql(Object.values(value));
    }

    it("check rendered value", function () {
        checkFruitValue(component['initialVeggie']);
    })

    it("update before add", async function () {
        component['veggie']['potato'] = 'POTATO';
        await component.waitFor('update');
        const veggie = component['initialVeggie'];
        veggie['potato'] = 'POTATO';
        checkFruitValue(veggie);
    })

    it("add", async function () {
        component['setInitial']();
        await component.waitFor('update');
        component['veggie']['amrud'] = 'amrud';
        await component.waitFor('update');
        const fruits = component['initialVeggie'];
        fruits['amrud'] = 'amrud'
        checkFruitValue(fruits);
    })

    it("update after add", async function () {
        component['veggie']['amrud'] = 'Amrud';
        await component.waitFor('update');
        const veggie = component['initialVeggie'];
        veggie['amrud'] = 'Amrud';
        console.log("outer html", component.outerHTML);
        checkFruitValue(veggie);
    })

    it("delete", async function () {
        delete component['veggie']['amrud'];
        await component.waitFor('update');
        const veggie = component['initialVeggie'];
        // veggie['amrud'] = 'Amrud';
        // delete 
        checkFruitValue(veggie);
    })

});

