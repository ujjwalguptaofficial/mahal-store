import { Godam, Mutation, Expression, Task } from "godam";

export class State {
    count = 0;
}

export class RootMutation extends Mutation {
    count(value) {
        this.state.count = value;
    }

    incrementCount() {
        ++this.state.count;
    }

    decrementCount() {
        --this.state.count;
    }
}

export class RootTask extends Task {
    addStudent(student) {
        let lastStudentId = this.get("lastStudentId");
        student.id = ++lastStudentId;

        this.set("students", student);
        this.set("lastStudentId", lastStudentId);
    }
}

export class RootExpression extends Expression {
    constructor() {
        super();
        this.markComputed('countPlus5', 'count');
    }
    get countPlus5() {
        return this.get('count') + 5;
    }
}

export default new Godam({
    state: State,
    mutation: RootMutation,
    task: RootTask,
    expression: RootExpression
});