export default class Alert {

    constructor(id) {
        this.alert = document.getElementById(id);
    }

    show() {
        this.alert.classList.remove('d-none');
        this.alert.innerText = "Text and description are required";
    }

    hide() {
        this.alert.classList.add('d-none');
    }

}