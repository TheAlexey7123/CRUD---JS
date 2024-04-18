import Addtodo from "./components/add-todo.js";

export default class Model {

    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        this.currentId = 0;

        if (!this.todos || this.todos.length < 1) {

            //this.todos = this.addtodo("Learn JS", "Watch Javascript tutorials on Youtube")

            this.todos = [{
                title: "Learn JS",
                description: "Watch Javascript tutorials on Youtube",
                completed: false,
                id: this.currentId++,
            }];

            this.save();
        }

        else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }

        this.addtodoF = new Addtodo();
        this.addtodoF.onclick((title, description) => this.addtodo(title, description));
    }

    addtodo(title, description) {
        const todo = this.createRow(title, description);
        this.view.createRow(todo);
        this.save();
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    checked(id) {
        const index = this.getIndex(id);
        this.todos[index].completed = !this.todos[index].completed;
        this.save();
    }

    editTodo(id, values) {

        const index = this.getIndex(id);
        this.todos[index].title = values.title.value;
        this.todos[index].description = values.description.value;
        this.todos[index].completed = values.completed;
        this.save();

        this.view.editTodo(id, values);
        //this.todos[index] = { id, ...values.value };
    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return this.todos;
    }

    getIndex(id) {
        return this.todos.findIndex(t => t.id == id);
    }

    removeTodo(id) {
        const index = this.getIndex(id);
        this.todos.splice(index, 1);
        document.getElementById(id).remove();
        this.save();
    }

    createRow(title, description) {
        const todo = {
            title,
            description,
            completed: false,
            id: this.currentId++,
        }

        this.todos.push(todo);
        this.save();
        return { ...todo };
    }

}