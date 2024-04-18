import Alert from "./alert.js";

export default class Modal {
    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.checkbox = document.getElementById('modal-completed')
        this.save = document.getElementById('modal-btn');
        this.close = document.getElementById('modal-close');
        this.alert = new Alert('modal-alert');
        this.todo = null;
    }

    setvalues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.checkbox.checked = todo.completed;
    }

    onclick(callback) {
        this.save.addEventListener('click', () => {
            if (!this.title.value || !this.description.value) {
                this.alert.show();
                return;
            }

            this.alert.hide();

            $("#modal").modal("toggle");

            callback(this.todo.id, {
                title: this.title,
                description: this.description,
                completed: this.checkbox.checked,
            });
        })
    }
}