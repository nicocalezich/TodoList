document.addEventListener('DOMContentLoaded', function(){
    const input = document.getElementById('input');
    const btn = document.getElementById('addbtn');
    const table = document.getElementById('table');
    let id = 1;


    btn.onclick = addTask;

    function removeTodo(id){
        document.getElementById(id).remove();
    }
    
    function addTask(){
        if(input.value === ''){
            alert("Task is required");
            return;
        }
        else{
            const row = table.insertRow();
            row.setAttribute('id', id++)
            row.innerHTML = `
            <td>${input.value}</td>         
            <td><input type="checkbox"></td>      
            <td></td>         
            `;                   
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.onclick = function (e){
                removeTodo(row.getAttribute('id'));
            }
            row.children[2].appendChild(removeBtn);

            input.value = "";       

        }
    }
});