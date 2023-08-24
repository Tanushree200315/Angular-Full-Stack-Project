const express = require('express')
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const server = express()
server.use(bodyParser.json());
//establish the database connection  
const cors = require("cors");

server.use(cors());
const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"dbsmschool",
});
db.connect(function(error){
    if(error){
        console.log("error Connecting to DB");
    } else{
        console.log("Successfully Connected to DB");
    }

});


//establish the port  
server.listen(8085,function check(error){
    if(error){
        console.log("Error........!!!!!")
    }else{
        console.log("Started........!!!!!")
    }
});

//create the record
server.post("/api/student/add",(req,res)=>{
 let details={
    stname:req.body.stname,
    course:req.body.course,
    fee:req.body.fee,
 };
 let sql="INSERT INTO student SET ?";
 db.query(sql,details,(error)=>{
     if(error){
      res.send({status:false,message:"Student creation failed"});
      }else{
      res.send({status:true,message:"Student created successfully"});
         }
  });
});

//view the records
server.get("/api/student",(req,res) =>{
var sql="SELECT * FROM student";
db.query(sql,function(error,result){
    if(error){
        console.log("Error connection to DB");
    }else{
        res.send({ status: true , data: result });
    }
});

});

//search the records
server.get("/api/student/:id",(req,res) =>{
    var studentid=req.params.id;
    var sql="SELECT * FROM student WHERE id=" + studentid;
    db.query(sql,function(error,result){
        if(error){
            console.log("Error connection to DB");
        }else{
            res.send({ status: true , data: result });
        }
    });
    
    });

//update the record
server.put("/api/student/update/:id",(req,res)=>{

    let sql=
    "UPDATE student SET stname='"
     +req.body.stname+
      "',course='"
    +req.body.course+
    "',fee='"
    +req.body.fee+
    "' WHERE id="
    +req.params.id;

    let a=db.query(sql,(error,result)=>{
        if(error){
            res.send({status:false ,message:"Student Updation Failed"});
        }else{
            res.send({status:true ,message:"Student Updated successfully"});
        }
    });

});

//Delete the records
server.delete("/api/student/delete/:id",(req,res) =>{
  
    let sql="DELETE FROM student WHERE id=" +  req.params.id;
    let query =db.query(sql,function(error){
        if(error){
            res.send({status:false ,message:"Student Deletion Failed"});
        }else{
            res.send({status:true ,message:"Student Deleted successfully"});
        }
    });
    
    });