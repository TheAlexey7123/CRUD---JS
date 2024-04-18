export default class Filters {

    constructor() {
        this.form = document.getElementById('filters');
        this.search = document.getElementById('search');
    }

    onclick(callback) {
        this.search.addEventListener('click', (e) => {
            e.preventDefault();
            const data = new FormData(this.form);

            callback({
                type: data.get('type'),
                words: data.get('words'),
            });
        });
    }
}