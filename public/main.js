var initalTodos = document.getElementById("category")[
    {id: 1, todo: null, complete: false, category: "Grocery"},
    {id: 1, todo: null, complete: false, category: "House"},
    {id: 1, todo: null, complete: false, category: "Grocery"},
    {id: 1, todo: null, complete: false, category: "School"}
]

function output(){
let categ = document.getElementById("category")
return categ.options[categ.selectedIndex].innerHTML
}

showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    const id=generateId();
    let task={
        id,
        task_name:addtaskinputval,
        completeStatus:false,
        category:output()

    }
    console.log(task);
    let data=JSON.stringify(task)
    console.log(data);
    
    fetch('/todos',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body:data
    }).then(res=>{
        console.log(res);
    })
    //addtaskinputval = initalTodos[1].id;
    // if(addtaskinputval.trim()!=0){
    // //if(addtaskinputval!=null){
    //     let webtask = localStorage.getItem("localtask");
    //     if(webtask == null){
    //         taskObj = [];
    //     }
    //     else{
    //         taskObj = JSON.parse(webtask);
    //     }
        
    //     //taskObj.push({'id':addtaskinputval, 'category':'hola','completeStatus':false});
    //     taskObj.push({'task_name':addtaskinputval, 'completeStatus':false,'category':output()});
    //     localStorage.setItem("localtask", JSON.stringify(taskObj));
    //     addtaskinput.value = '';
    // }

    
    
    showtask();
})


//  Show to-do list
 function showtask(){

    console.log('this ShowTask');
    fetch('/todos')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        let todos=data.todos;
        let html = '';
        let addedtasklist = document.getElementById("addedtasklist");
        let taskCompleteValue='';
        todos.map((todo,index)=>{
            if(todo.completeStatus==true){
                taskCompleteValue = `<td class="completed">${todo.task_name}</td>`;
            }else{
                taskCompleteValue = `<td>${todo.task_name} ${todo.category}</td>`;
            }
            html += `<tr>
            <th scope="row">${index+1}</th>
            ${taskCompleteValue}
            <td><button type="button" onclick="edittask(event)" id=${todo.id} class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
            <td><button type="button" class="text-success" id=${todo.id}><i class="fa fa-check-square-o"></i>Complete</button></td>
            <td><button type="button" onclick="deleteitem(event)" id=${todo.id} class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
        </tr>`;
        })

        addedtasklist.innerHTML = html;
    })

    // let html = '';
    // let addedtasklist = document.getElementById("addedtasklist");
    // taskObj.forEach((item, index) => {

    //     if(item.completeStatus==true){
    //         taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
    //     }else{
    //         taskCompleteValue = `<td>${item.task_name} ${item.category}</td>`;
    //     }
    //     html += `<tr>
    //                 <th scope="row">${index+1}</th>
    //                 ${taskCompleteValue}
    //                 <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
    //                 <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
    //                 <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
    //             </tr>`;
    // });



    // addedtasklist.innerHTML = html;
}

// Edit the tastk to-do
async function edittask(event){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");

    saveindex.value=event.target.id;

    // fetch todo from server
    fetch('/todos')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        let todos=data.todos;
        todos=todos.filter(todo=>todo.id==event.target.id)
        addtaskinput.value=todos[0].task_name;

    }
    )
    

    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

// Save task to server 
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");

    let id = document.getElementById("saveindex").value;
    let data={
        id:id,
        task_name:addtaskinput.value
    }
    data=JSON.stringify(data)
    fetch('/edit',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body:data
    }).then(res=>{
        console.log(res);
    })

    addtaskinput.value='';
    document.getElementById('savetaskbtn').style.display='none';
    addtaskbtn.style.display='block';
    showtask();
})

// delete
function deleteitem(event){

    console.log(event.target.id);
    let data={
        id:event.target.id
    }
    data=JSON.stringify(data)
    fetch('/delete',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body:data
    }).then(res=>{
        console.log(res);
    })
    showtask();
}

//show/hide
function show_hide(){
	let addedtasklist = document.getElementById("addedtasklist");
	  if (addedtasklist.style.display === "none") {
	    addedtasklist.style.display = "block";
	  } else {
	    addedtasklist.style.display = "none";
	  }	
	 
}

// complete task
let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
       // console.log(e);
        
        // showtask();
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){

            let id = mytarget.getAttribute("id");
            let data={
                id:id
            }
            data=JSON.stringify(data)
            fetch('/complete',{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:"POST",
                body:data
            }).then(res=>{
                console.log(res);
            })
    //     let mytargetid = mytarget.getAttribute("id");
        
        
    //     // let taskValue = taskObj[mytargetid]['task_name'];
        
    //     mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
    //         for (keys in taskObj[mytargetid]) {
    //             if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
    //                 taskObj[mytargetid].completeStatus = false;

    //             }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
    //                 taskObj[mytargetid].completeStatus = true;

    //             }
    //           }

    //    // showtask();        
    //     localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
})

    

// delete All
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");

    fetch('/deleteAll')
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";

    showtask();

})


// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})




var generateId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };