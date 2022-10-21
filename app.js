const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const path=require("path");
const https=require("https");
const port=process.env.PORT ||3000;
const app=express();

app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

//api key 44f942939039a4d70526ab4f409e1dba-us11

 //audience id d1f322226d.

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const  email=req.body.email;
const data={
  members:[
    {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:firstname,
      LNAME:lastname
    }
  }
  ]
};
const jsondata=JSON.stringify(data);

const url="https://us11.api.mailchimp.com/3.0/lists/d1f322226d";
const options={
  method:"POST",
  auth:"praveenpathak207:44f942939039a4d70526ab4f409e1dba-us11"
};

const request= https.request(url,options,function(response){

   if(response.statusCode===200)
   {
     res.sendFile(__dirname +"/success.html");
   }
   else
    {
       res.sendFile(__dirname +"/failure.html");
    }

       response.on("data",function(data){
         console.log(JSON.parse(data));
        })
})
request.write(jsondata);
request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(port,function(){
  console.log("Server is running on port 3000");
})
