
class Task{
    constructor(data) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.parentId = data.get('parentId')
        this.text = data.get('text')
        this.status = 0
    }
}

class ToDoList{
    constructor(data) {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join("")
        this.name = data.get('text')
        this.status = 0
        this.tasks = []
    }
}





const state = {
    toDoLists: []
    
}
const view = (state) => `
<section>
    <ul>
    ${state.toDoLists.map(todolist => `<li class=""ToDoList">${todolist.name}
    <form onsubmit="app.run('addTask', this);return false;" >
        <input name="text" placeholder="Add a task" />
        <input type="hidden"  type="number name="parentId" value="${todolist.id}">
        <button class="addBtn">Add</button>
    </form>
</section>`).join("")}
    </ul>
    <section>
            <form class="header" onsubmit="app.run('addToDoList', this);return false;" >
                <input name="text" placeholder="Add a ToDoList" />
                <button class="addBtn">Add</button>
            </form>
        </section>
</section>
`
const update = {
    addToDoList: (state, form) => {
        const data = new FormData(form)
        const list = new ToDoList(data)
        state.toDoLists.push(list)
        return state
    },
    addTask: (state, form) => {
        const data = new FormData(form)
        const task = new Task(data)
        state.toDoList.find(list => list.id === task.parentId).tasks.push(task)
        return state
    },
    showTasks: (state, form) => {
        const data = new FormData(form)
        
        
    }
}



app.start('app', state, view, update)

{/* <section>
    <form onsubmit="app.run("showTasks", this);return false;"></form>
            <ul>
                ${state.tasks.map(task => `<li>${task.text}</li>`).join("")}
            </ul>
        </section>
        <section>
            <form onsubmit="app.run('addTask', this);return false;" >
                <input name="text" placeholder="Add a task" />
                <input type="hidden"  type="number name="parentId" value="${this.id}">
                <button class="addBtn">Add</button>
            </form>
        </section>
        ` */}