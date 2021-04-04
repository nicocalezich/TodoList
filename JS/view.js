import AddTodo from './components/add-todo.js'

export default class View{

    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();    
        this.addTodoForm.onClick((todo) => this.addTodo(todo));  
        this.isDark = null;
        this.theme = document.getElementById('theme');
        this.theme.onclick = () => {
            this.isDark ? this.switchToLightMode() : this.switchToDarkMode(); 
            this.model.setTheme(this.isDark);
            console.log(this.model.getTheme());
        } 
    }

    loadTheme(){
        this.isDark = this.model.getTheme();
        this.isDark ? this.switchToDarkMode() : this.switchToLightMode();
    }

    setModel(model){
        this.model = model;
    }

    scrollReveal(){
        ScrollReveal().reveal('.titulo');
        ScrollReveal().reveal('.task-container');
        ScrollReveal().reveal('.table-container');
        ScrollReveal().reveal('.col-xs-7',{delay: 100});
        ScrollReveal().reveal('.col-xs-3',{delay: 100});
        ScrollReveal().reveal('.col-xs-7',{delay: 100});
    }
 
    switchToDarkMode(){
        this.isDark = true;
        document.body.style.backgroundColor = "black";
        document.getElementById("title").style.color = "white";
        document.getElementById("table").style.color = "white";
        document.getElementById("icon-theme").style.color = "white";  
        document.getElementById("label-theme").innerText = "Light mode";
        document.getElementById("label-theme").style.color = "white";
        document.getElementById("add-icon").style.color = "black";
        
    }

    switchToLightMode(){
        this.isDark = false;
        document.body.style.backgroundColor = "white";
        document.getElementById("title").style.color = "black";
        document.getElementById("table").style.color = "black";
        document.getElementById("icon-theme").style.color = "black";
        document.getElementById("label-theme").innerText = "Dark mode";
        document.getElementById("label-theme").style.color = "black"; 
        document.getElementById("add-icon").style.color = "white";
       
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
        this.loadTheme();
        this.scrollReveal();
    }
   
    taskCompleted(id){
        this.model.taskCompleted(id);
        const todo = this.model.findTodoById(id);      
        //mark or unmark task
        document.getElementById(id).children[0].innerHTML = todo.completed ? todo.task.strike() : todo.task;   
    }

    addTodo(task){
        const todo = this.model.addTodo(task)
        this.createRow(todo);
    }

    createRow(todo){

        //crea la fila
        const row = table.insertRow();
        row.setAttribute('id', todo.id);          
        let task = todo.task;
        task = todo.completed ? task.strike() : todo.task;

        //inserta la tarea 
        row.innerHTML = `
        <td class="col-xs-7">${task}</td>         
        <td class="col-xs-3" id="center-text"></td>      
        <td class="col-xs-7" title="Delete task"></td>         
         `;

        //crea y agrega un checkbox
        const checkbox = document.createElement('input');
        checkbox.classList.add('form-check-label')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.taskCompleted(todo.id);
        row.children[1].appendChild(checkbox);

        //crea y agrega un boton de eliminar
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm','delete');
        removeBtn.innerHTML = '<i id="delete-icon" class="fas fa-times"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);   
        row.children[2].appendChild(removeBtn);
        }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();            
    }
   
};