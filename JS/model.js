export default class Model {

    constructor(){
        this.view = null;
        this.darkTheme = JSON.parse(localStorage.getItem('isDark'));
        if (!this.darkTheme){
            this.darkTheme = false;
        }
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1){
            this.todos = [
                {
                    id: 0,
                    task: "task de prueba",
                    completed: false
                }
            ] 
            this.currentId = 1;
         }else{
            this.currentId = this.todos[this.todos.length-1].id + 1;
        }
      
    }

    getDarktheme(){
        return this.darkTheme;
    }

    setDartheme(darkTheme){          
        this.darkTheme = darkTheme;
        this.saveDarktheme();       
    }
  
    saveDarktheme(){
        localStorage.setItem('isDark', JSON.stringify(this.darkTheme));
    }

    setView(view){
        this.view = view;
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos(){
        return this.todos;
    }

    findTodo(id){
        return this.todos.findIndex((todo) => todo.id === id);
    }

    taskCompleted(id){
       const index = this.findTodo(id);
       const todo = this.todos[index];
       todo.completed = !todo.completed;
       this.save();
    }

    findTodoById(id){
        const index = this.findTodo(id);
        return this.todos[index]
    }

    addTodo(task){
        const todo = {
            id: this.currentId++,
            task,
            completed: false
        }

        this.todos.push(todo);
        this.save();

        return {...todo}
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index,1);
        this.save();
    }

};