
class Task{
    constructor(data) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.text = data.get('text')
        this.status = 0
    }
}

const state = {
    tasks: []
}
const view = (state) => `
    <section>
        <h1>Tasks</h1>
        <ul>
            ${state.tasks.map(task => `<li>${task.text}</li><form onsubmit="app.run('delete', this);return false;"><input type="hidden"  type="number" name="id" value="${task.id}"><button>Delete</button></form>`).join("")}
        </ul>
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="text" placeholder="add a task" />
            <button>Add</button>
        </form>
    </section>
`
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        const task = new Task(data)
        state.tasks.push(task)
        return state
    },
    delete: (state, form) => {
        const data = new FormData(form)
        const id = data.get('id')
        console.log(state, id)
        const index = state.tasks.findIndex(task => {return task.id == id});
        state.tasks.splice(index, 1)
        return state
    }
}
app.start('app', state, view, update)