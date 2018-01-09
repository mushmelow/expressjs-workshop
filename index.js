//expressJs is a framework that communicate with the webServer
//npm install express
//npm install --global nodemon
//$ nodemon

var express = require('express');
var app = express();

//will print a msg when we send a request
var middleWare=app.use((req,res, next)=>{
  console.log('new request'+ req.url)
  next();
})

//exo1 
app.get('/hello', function (req, res) {
  res.send('hello')
})
// //exo 2
app.get('/hello', function (req, res) {
  
  
  if(req.query.hasOwnProperty('name')){
    res.send( 'Hello '+ req.query.name);
  }
  else{
    res.send('no name was found')
  }
  
  
 
});
   //http://decodemtl-workspace-zhenghao22.c9users.io/hello?name=hao

//ziad version
// app.get('/hello',(req, res)=> {
//   if(req.query.firstName && req.query.lastName){
//     res.send(`<h1> Hello ${req.query.firstName} ${req.query.lastName}</h1>}`);
//   }
//   else{
//   res.send(`<h1> Hello World</h1>`);
//   }
     
// });


//exo3
// app.get('/calculator/:operation',function(req,res){
//   // console.log(req.params)
//   // console.log(req.query)
  
//   //http://decodemtl-workspace-zhenghao22.c9users.io/calculator/add?var1=31&var2=5

//   var total=0;
//   var num1= parseInt(req.query.var1);
//   var num2= parseInt(req.query.var2);
//   var operation= req.params.operation
  
//   //req.query and req.params are object thats why we use. to acces it
  
//   if(operation!=="add"&&operation!=="multiply"){
//     res.status(404);
//     res.send('not a add or multiply');
//   }
//   else{
    
//     if (num1===undefined){
//       num1=0
//     }
//     if(num2===undefined){
//       num2=0
//     }
    
//       if(operation == 'add'){
        
        
//       total=num1+num2;
        
//         res.json
//         ({ 
//         "operation": operation,
//         "firstOperand": num1,
//         "secondOperand": num2,
//         "solution": total 
          
//         })
//       }
//       else if(operation == 'multiply'){
//         total=num1*num2;
        
//         res.json
//         ({ 
//         "operation": operation,
//         "firstOperand": num1,
//         "secondOperand": num2,
//         "solution": total 
//         })
//       }
      
  
//   }
// });

  //ziad version
  
  app.get('/calculator/:operation',(req,res)=>{
    //+ change the string to a number
    var num1= +req.query.num1
    var num2= +req.query.num2
    var op= req.params.operation
    if(op !== 'add' && op !== 'multiply'){
      res.status(400).json({error: "operation must be one of add or multiply"});
    return;
     }
    
    var response = {
      operation: op,
      firstOperand: num1,
      secondOperand: num2,
      solution: req.params.operation === 'add' ? num1+num2:num1*num2
    }
    
    res.json(response);
  })

  //exo 4
  'use strict';
  // load the mysql library
  var mysql = require('promise-mysql');
  
  // create a connection to our Cloud9 server
  var connection = mysql.createPool({
      host     : 'localhost',
      user     : 'zhenghao22', // CHANGE THIS :)
      database: 'reddit',
      connectionLimit: 10
  });
  
  //to access folder in another file use ../folderName/fileName 
  var reddit = require('../reddit-nodejs-api/reddit.js')
  var myReddit = new reddit(connection);
  
  // app.get('/posts',function(req,res){ 
   
  //     myReddit.getAllPosts().then(data=>{
        
  //       var postList= `<div id="posts">
  //                 <h1>List of posts</h1>
  //                 <ul class="posts-list">`;
  
  //           //always do the logic before sending
  //           data.forEach(function(element) {
  //             
  //              // use ${} to access variable
  //           postList += `
  //                   <li class="post-item">
  //                     <h2 class="post-item__title">
  //                       <a href=${element.url}>${element.title}</a>
  //                     </h2>
  //                     <p>Created by${element.user.username}</p>
  //                   </li>

  //                    `
  //           })
  //           var postHTMLString = postList +  
  //             `
  //             </ul>
  //             </div>
  //             `
  //         res.send(postHTMLString);
  //       })
        
         
          
  //     })
      
  
  
  //ziad version

  
  app.set('view engine', 'pug');
  app.get('/posts',(req,res)=>{
    //1-make request to db
    //2-iterate over the result and build html
    //3-send html to client
     
    myReddit.getAllPosts()
    .then(results=>{
        
      //template version
      //1-create folder view and file called posts.pug
      //res.render will take the posts.pug
      
      //posts is my post file.pug
      //data fake name that im sending to my post file
      //results is the variable results in my promise
      res.render('posts', {data: results})
     
       
       
    })
     
      })
     
  //exo5  
  // app.get('/new-post',function(req,res){
    
  //   //use method post to send the form
  //   res.send(`
  //   <form action="/createPost" method="POST"><!-- why does it say method="POST" ?? -->
  //     <p>
  //     <input type="text" name="url" placeholder="Enter a URL to content">
  //     </p>
  //     <p>
  //       <input type="text" name="title" placeholder="Enter the title of your content">
  //     </p>
  //       <button type="submit">Create!</button>
  //   </form>
  //   `)
  // })    
     
 
 //ziad version
 
app.get('/new-post',function(req,res){
  res.render('form');
})


  //exo6
  //$ npm install body-parser
  
  //bodyParser will return a object
  var bodyParser = require('body-parser')

  // create application/x-www-form-urlencoded parser 
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  // POST /new-post gets urlencoded bodies and will redirect user to createPost
  //and send data in the body
  app.post('/createPost',urlencodedParser, function (req, res) {
    
    //to access a specific data from the bodyParser
    //console.log(req.body.url);
    
    var post={
      url:req.body.url,
      title:req.body.tittle,
      userId:3444,
      subredditId:301
    }
  
     myReddit.createPost(post)
    .then((data)=>{
      
      console.log('sucess')
     
      
    })
    
    
  //process the request and redirect the user
    res.redirect('/new-post')
  
  })
  
  
 

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :)   */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});

