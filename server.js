const express=require('express');

const fs=require('fs');

const app=express();

// serving static files
app.use(express.static('public'))
app.use(express.json())



app.post('/todos',(req,res)=>{

    // Get existing data in file first

    // fs.readFile('todos.json','utf8',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         return
    //     }


    //     // getting data and putting it in array

    //   let todos=new Array();
    //      todos=data;
    //     console.log(todos);
    //     todos.push(req.body)
    //     // let todo=JSON.stringify(req.body);
    //     // todos.push(todo);
        
    //     // fs.writeFile('todos.json',JSON.stringify(todos,null,2),'utf-8',(err)=>{
    //     //     if(err)console.log(err);
    //     // })
    // })
    let todos=[];
    var stringTodos=fs.readFileSync('todos.json');
    todos=JSON.parse(stringTodos)
    todos.push(req.body);
    fs.writeFileSync('todos.json',JSON.stringify(todos,null,2),('utf-8'))
    console.log(todos);


    // let arr=[];
    // arr.push(req.body)
    // fs.writeFile('todos.json',JSON.stringify(arr,null,2),'utf-8',(err)=>{
    //     if(err)console.log(err);
    // })
    res.send('something')
})



// Retreving all todos

app.get('/todos',(req,res)=>{

    let todos=[];
    var stringTodos=fs.readFileSync('todos.json');
    todos=JSON.parse(stringTodos)

    res.status(200).json({
        success:true,
        todos:todos
    })

})


// updating todo

app.post('/complete',(req,res)=>{
    console.log(req.body.id);

    let todos=[];
    var stringTodos=fs.readFileSync('todos.json');
    todos=JSON.parse(stringTodos)

    todos=todos.map(todo=>{
        if(todo.id==req.body.id){
            todo.completeStatus=true;
        }
        return todo
    })
    console.log(todos);
 
    fs.writeFileSync('todos.json',JSON.stringify(todos,null,2),('utf-8'))

    res.status(200).json({
        success:true
    })

})


app.post('/delete',(req,res)=>{
    console.log('/in delete');
    console.log(req.body.id);

    let todos=[];
    var stringTodos=fs.readFileSync('todos.json');
    todos=JSON.parse(stringTodos)

    let filteredTodos=[];
    filteredTodos=todos.filter(todo=>todo.id !==req.body.id)
    
    console.log(filteredTodos);
 
    fs.writeFileSync('todos.json',JSON.stringify(filteredTodos,null,2),('utf-8'))

    res.status(200).json({
        success:true
    })

})


app.post('/edit',(req,res)=>{
    console.log(req.body.id);

    let todos=[];
    var stringTodos=fs.readFileSync('todos.json');
    todos=JSON.parse(stringTodos)

    todos=todos.map(todo=>{
        if(todo.id==req.body.id){
            todo.task_name=req.body.task_name;
        }
        return todo
    })
 
    fs.writeFileSync('todos.json',JSON.stringify(todos,null,2),('utf-8'))

    res.status(200).json({
        success:true
    })

})

app.get('/deleteAll',(req,res)=>{
    let todos=[];
    fs.writeFileSync('todos.json',JSON.stringify(todos,null,2),('utf-8'))
    res.send('done')
})

app.listen(5000,()=>{
    console.log('server is running');
})
