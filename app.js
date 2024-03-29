const { Component, mount, xml, useState } = owl;

class Task extends Component {
    static template = xml`
        <li t-attf-style="background-color:#{props.task.color}" class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
            <div class="form-check form-switch fs-5">
                <input class="form-check-input" type="checkbox" value="" t-on-checked="props.task.isComplete" t-att-id="props.task.id"
                t-on-click="toggleTask"/>
                <label class="form-check-label" t-att-for="props.task.id" 
                t-attf-class="#{props.task.isComplete ? 'text-decoration-line-through' : ''}">
                    <t t-out="props.task.name"/>
                </label>
            </div>
            <div>
                <button class="btn btn-primary me-2"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
            </div>
        </li>
    `
    static props = ["Task"]

    toggleTask() {
        this.props.task.isComplete = !this.props.task.isComplete;
    }
}

class Root extends Component {
    static template = xml`
    <div>
                    <div class="input-grou-lg w-100 d-flex border rounded align-items-center">
                        <input type="text" class="form-control-lg flex-fill border-0 me-1"
                            placeholder="Add your new task" aria-label="Add your new task"
                            aria-describedby="basic-addon2"  t-att-value="state.name" t-model="state.name"/>
                        <input type="color" class="form-control-lg form-control-color border-0 bg-white m-0" id="color"
                            t-att-value="state.color" title="Choose your color" t-model="state.color"/>
                        <button class="btn btn-primary" type="button" id="button-addon2" t-on-click="addTask"><i
                                class="bi bi-plus-lg fs-3"></i></button>
                    </div>
                </div>
                <ul class="d-flex flex-column mt-5 p-0">
                    <t t-foreach="tasks" t-as="task" t-key="task.id">
                        <Task task="task" />
                    </t>
                </ul>
    `
    static components = { Task }

    setup() {
        this.state = useState({
            name: "",
            color: "#fff000",
            isComplete: false,
        })

        this.tasks = useState([]);
    }
    addTask() {
        if (!this.state.name) {
            alert("Please Provide name of the task !");
            return
        }

        const id = Math.random().toString().substring(2, 12);

        this.tasks.push({
            id: id,
            name: this.state.name,
            color: this.state.color,
            isComplete: false,
        })

        let state = this.state;
        this.state = { ...state, name: "", color: "#fff000" }

        console.log(this.tasks);
    };
}

mount(Root, document.getElementById('root'));