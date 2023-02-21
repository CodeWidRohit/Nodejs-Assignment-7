const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const InitialData=require("./InitialData");
const studentArray = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student",(req,res)=>{
    res.json(InitialData)
})
app.post("/api/student",(req,res)=>{
     
    if(!req.body.id){
        res.status(400)
        return res.json ({message:"error in id"});
    }

    const user={
    id:InitialData.length+1,
    name:req.body.name,
    currentClass:req.currentClass,
    division:req.body.division
    }
    studentArray.push(user);
    res.json(user)
})
app.put("/student/:id",(req,res)=>{
    let id=req.params.id,
     name=req.body.name,
     currentClass=req.body.currentClass,
     division=req.body.division

   let index=studentArray.findIndex((studentArray)=>{
    return (studentArray.id== Number.parseInt(id));
   })
   if(index>=0){
    let std= studentArray[index]
    std.name=name
    std.currentClass=currentClass
    std.division=division
    res.json(std);
   }
})
app.delete('/:id', (req,res)=>{
    let index=studentArray.findIndex((studentArray)=>{
        return (studentArray.id==Number.parseInt(id));
    })
    if(index){
        
        studentArray.splice(index,1)
        
        res.json("succesful delete")
    }
    else{
        res.status(404).json("Get Failed!! Id not found")
    }
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   