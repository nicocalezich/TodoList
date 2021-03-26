export default class AddTodo{
constructor(){
    this.btn = document.getElementById('addbtn');
    this.input = document.getElementById('input');
}

onClick(callback){
    this.btn.onclick = () => {
        if(input.value === ''){
            alert("Task is required");
            return;
        }
        else{
            callback(this.input.value);
            this.input.value = "";
        }
    }
}

}