const express = require('express');
const app = express();
const {MongoClient} = require("mongodb");
const url="mongodb://localhost:27017/";
const client=new MongoClient(url);
app.use(express.urlencoded({ extended: true }));
async function connect(){
	try{
		await client.connect();
		console.log('MongoDB Connected');
	}
	catch(err)
	{
		console.log('err occ');
		process.exit(1);
	}
}
app.use(express.static(__dirname + "/images"));
app.get('/',function(req,res){
	res.sendFile(__dirname+"/homepage.html");
});

app.get('/loginpage.html',function(req,res){
	res.sendFile(__dirname+"/loginpage.html");
});

app.get('/profilepage.html',function(req,res){
	res.sendFile(__dirname+"/profilepage.html");
});

app.get('/logind',async function(req,res){
	const db=client.db("gamestore");
	const coll=db.collection("regdetails");
	var result=await coll.find({},{_id:0,Username:1,Password:1}).toArray();
	var flag=0;
	for(var i=0;i<result.length;i++)
	{
		if(result[i].Username == req.query.fname)
		{
			flag=1;
			if(result[i].Password == req.query.lname)
			{
				res.sendFile(__dirname+"/userhome.html");
			}
			else
			{
				res.write("<h1>Wrong Password<h1>");
			}
		}
	}
	if(flag==0)
	{
		res.write("<h1>No User Found<h1>");
	}

});
app.get('/profile',async function(req,res){
	const db=client.db("gamestore");
	const coll=db.collection("regdetails");
	var result=await coll.find({},{_id:0,firstname:1,lastname:1,Username:1,Password:1}).toArray();
	var flag=0;
	for(var i=0;i<result.length;i++)
	{
		if(result[i].Username == req.query.fname)
		{
			flag=1;
			if(result[i].Password == req.query.lname)
			{
				res.sendFile(__dirname+"/userhome.html");
			}
			else
			{
				res.write("<h1>Wrong Password<h1>");
			}
		}
	}
	if(flag==0)
	{
		res.write("<h1>No User Found<h1>");
	}

});
app.get('/GameStore.html',function(req,res){
	res.sendFile(__dirname+"/GameStore.html");
});
app.get('/insert',async function(req,res){
	
	var doc={firstname:req.query.fname,lastname:req.query.lname,Username:req.query.uname,Password:req.query.pass,Age:req.query.age,DateOfBirth:req.query.dob,Phonenumber:req.query.pno};
	const db=client.db("gamestore");
	const coll=db.collection("regdetails");
	var result=await coll.insertOne(doc);
	res.write("<h1>Insert Ok</h1>");
	res.end();
});

app.get('/delete.html',function(req,res){
	res.sendFile(__dirname+"/delete.html");
});

app.get('/delete',async function(req,res){
	
	var doc={email:req.query.email};
	const db=client.db("mepco");
	const coll=db.collection("stud");
	var result=await coll.deleteOne(doc);
	res.write("<h1>deleted Ok</h1>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});

app.get('/update.html',function(req,res){
	res.sendFile(__dirname+"/update.html");
});

app.get('/findAll',async function(req,res){
	
	const db=client.db("mepco");
	const coll=db.collection("stud");
	res.write("<h1>Display All Ok</h1>");
	var result=await coll.find({},{_id:0,name:1,email:1}).toArray();
	res.write("<ol>");
	for(var i=0;i<result.length;i++)
	{
		res.write("<li>");
		res.write(result[i].name+" "+result[i].email);
		res.write("</li>");
	}
	res.write("</ol>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});

app.get('/findOne.html',function(req,res){
	res.sendFile(__dirname+"/findOne.html");
});
app.get('/findOne',async function(req,res){
	
	const db=client.db("mepco");
	const coll=db.collection("stud");
	res.write("<h1>Display All Ok</h1>");
	var result=await coll.find(req.query,{_id:0,name:1,email:1}).toArray();
	res.write("<ol>");
	for(var i=0;i<result.length;i++)
	{
		res.write("<li>");
		res.write(result[i].name+" "+result[i].email);
		res.write("</li>");
	}
	res.write("</ol>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});

app.get('/update',async function(req,res){
	
	var doc={email:req.query.email};
	var newdoc={name:req.query.name};
	
	const db=client.db("mepco");
	const coll=db.collection("stud");
	
	var result=await coll.updateOne(doc,{$set:doc});
	res.write("<h1>Updated Ok</h1>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});


app.get('/index.html',function(req,res){
	res.sendFile(__dirname+"/index.html");
});
app.get('/insert.html',function(req,res){
	res.sendFile(__dirname+"/insert.html");
}); 


// Start the server 
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
    connect();//MongoDb comm
});