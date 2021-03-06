import { Godam, Mutation, Expression, Task, Computed, clone } from "godam";

export class State {
    count = 0;
    lastStudentId = 0;
    students = [];
    fruits = [];
    initialFruits = ["Banana", "Orange", "Apple", "Mango"];

    veggie = {};
    initialVeggie = {
        potato: "potato", peas: "peas", spinach: "spinach", brinjal: "brinjal"
    }
}

export class RootMutation extends Mutation<State> {
    count(value) {
        this.state.count = value;
    }

    incrementCount() {
        ++this.state.count;
    }

    decrementCount() {
        --this.state.count;
    }

    addStudent(student) {
        this.state.students.push(student)
    }

    lastStudentId(value) {
        this.state.lastStudentId = value;
    }

    initializeFruits() {
        this.state.fruits = clone(
            this.state.initialFruits
        );
    }

    initializeVeggie() {
        this.state.veggie = clone(
            this.state.initialVeggie
        );
    }
}

export class RootTask extends Task<State> {
    addStudent(student) {
        let lastStudentId = this.get("lastStudentId");
        student.id = ++lastStudentId;

        this.set("addStudent", student);
        this.set("lastStudentId", lastStudentId);
    }

    removeStudent(id) {
        const students = this.get('students');
        const index = students.findIndex(q => q.id === id);
        if (index >= 0) {
            students.splice(index, 1);
            return 1;
        }
        return 0;
    }

    updateStudent(student) {
        const savedStudent = this.eval('studentById', student.id);
        if (savedStudent) {
            Object.assign(savedStudent, student);
            return true;
        }
        return false;
    }

}

export class RootExpression extends Expression<State> {
    constructor() {
        super();
        this.markComputed('countPlus5', 'count');
    }

    get countPlus5() {
        return this.get('count') + 5;
    }

    studentById(id) {
        const students = this.get('students');
        return students.find((qry) => qry.id === id);
    }

    @Computed('fruits')
    get fruitsLength() {
        return this.get('fruits').length;
    }

    @Computed('fruits')
    get fruitsAsObject() {
        const obj = {};
        this.get('fruits').forEach(fruit => {
            obj[fruit] = fruit;
        });
        return obj;
    }

    @Computed('veggie')
    get veggieLength() {
        return Object.keys(this.get('veggie')).length;
    }

    @Computed('veggie')
    get veggieArray() {
        return Object.values(this.get('veggie'));
    }
}

export default new Godam({
    state: State,
    mutation: RootMutation,
    task: RootTask,
    expression: RootExpression
});