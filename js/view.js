import Modal from "./components/modal.js"
import Filter from "./components/filters.js"

export default class View {
    constructor() {
        this.model = null;
        this.modal = new Modal();
        this.filter = new Filter();

        this.filter.onclick((f) => this.filterFunction(f));
        this.modal.onclick((id, values) => this.model.editTodo(id, values));

    }

    setModel(model) {
        this.model = model;
    }

    removeTodo(id) {
        this.model.removeTodo(id);
    }

    filterFunction(f) {
        //console.log(f.type, f.words);
        let { type, words } = f;

        if (!type) {
            type = "all";
        }

        if (words == "") {
            return;
        }

        const [_, ...table] = document.querySelectorAll('tr');

        for (const t of table) {
            const [title, description, completed] = t.children;
            let shouldHide = false;
            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const taskCompleted = completed.children[0].checked;
            const isCompleted = type == "completed";

            if (type != "all" && (taskCompleted !== isCompleted)) {
                shouldHide = true;
            }

            if (shouldHide) {
                t.classList.add('d-none');
            }

            else {
                t.classList.remove('d-none');
            }
        }
    }

    render() {
        const todos = this.model.getTodos();

        todos.forEach((todo) => this.createRow(todo));
    }

    checked(id) {
        this.model.checked(id);
    }

    editTodo(id, values) {
        const row = document.getElementById(id);
        row.children[0].innerText = values.title.value;
        row.children[1].innerText = values.description.value;
        row.children[2].children[0].checked = values.completed;
    }

    setValues(todo) {
        this.modal.setvalues(todo);
    }

    createRow(todo) {
        const tr = table.insertRow();
        tr.setAttribute('id', todo.id);
        tr.innerHTML = `<td>
            ${todo.title}
        </td>
        <td>
            ${todo.description}
        </td>
        <td class="text-center">
            
        </td>
        <td class="text-right">

        </td>
        </tr>`;

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const pencil = document.createElement('button');
        pencil.classList.add('btn', 'btn-primary', 'mb-1');
        pencil.innerHTML = `<i class="fa fa-pencil"></i>`;
        pencil.setAttribute('data-toggle', 'modal');
        pencil.setAttribute('data-target', '#modal')

        const remove = document.createElement('button');
        remove.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        remove.innerHTML = `<i class="fa fa-trash"></i>`;

        tr.children[2].append(checkbox);
        tr.children[3].append(pencil, remove);
        table.appendChild(tr);

        checkbox.addEventListener('click', () => {
            this.checked(todo.id);
        });

        pencil.addEventListener('click', () => {
            this.setValues(todo);
        });

        remove.addEventListener('click', () => {
            this.removeTodo(todo.id);
        })
    }
}