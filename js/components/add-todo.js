import Alert from "./alert.js";

export default class Addtodo {

    constructor() {
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.add = document.getElementById('add');
        this.table = document.querySelector('table');

        this.alert = new Alert('alert');
    }

    onclick(callback) {
        this.add.addEventListener('click', () => {
            if (this.title.value == "" || this.description.value == "") {
                this.alert.show();
            }

            else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }

        })
    }
}