import Model from './model.js';
import View from './view.js';

document.addEventListener('DOMContentLoaded', function(){

    const model = new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
    view.render();
    let isDark = false;
    this.theme = document.getElementById('theme');
    this.theme.onclick = () => {
          if (!this.isDark){
        document.body.style.backgroundColor = "black";
        document.getElementById("title").style.color = "white";
        document.getElementById("table").style.color = "white";
        document.getElementById("icon-theme").style.color = "white";      
        this.isDark = true;
        }
        else{
            document.body.style.backgroundColor = "white";
            document.getElementById("title").style.color = "black";
            document.getElementById("table").style.color = "black";
            document.getElementById("icon-theme").style.color = "black";
            this.isDark = false;
        }

    
};

  

});