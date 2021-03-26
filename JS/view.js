import AddTodo from './components/add-todo.js'

export default class View{

    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();    
        this.addTodoForm.onClick((todo) => this.addTodo(todo));         
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }
   
    taskCompleted(id){
        this.model.taskCompleted(id);
        const todo = this.model.findTodoById(id);
        let task;
        if (todo.completed){
             task = todo.task.strike();
        }
        else{
            task = todo.task;
        }
      
        document.getElementById(id).children[0].innerHTML = task;
        
    }

    addTodo(task){
        const todo = this.model.addTodo(task)
        this.createRow(todo);
    }

    createRow(todo){

        //crea la fila
        const row = table.insertRow();
        row.setAttribute('id', todo.id)            
        let task = todo.task;

        //si la tarea esta completa, tacha la task
        if (todo.completed){
            task = task.strike();
        }
       
        row.innerHTML = `
        <td>${task}</td>         
        <td></td>      
        <td></td>         
         `;

   
        //crea y agrega un checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.taskCompleted(todo.id);
        row.children[1].appendChild(checkbox);

        //crea y agrega un boton de eliminar
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);   
        row.children[2].appendChild(removeBtn);
        }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();            
    }
   
};