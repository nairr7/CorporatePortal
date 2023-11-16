
const express = require('express')
const app = express()
const dbfile = require('./conn')
const cors = require('cors');
const multer = require('multer');
const csvtojson = require('csvtojson');
const mongoose = require('mongoose');


const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

var corsOptions = {
    origin : "http://localhost:4200"
}

app.use(cors(corsOptions));

const postrouteht = require('./routes/housetype')
const postroute = require('./routes/country')
const postrouteEB = require('./routes/employeeband')
const postrouteSignup = require('./routes/signup')
const postrouteorg = require('./routes/organization')
const postroutehs = require('./routes/housesize')
const postrouterf = require('./routes/relocform')
const postroutehr = require('./routes/hr')
const Bulkupload = require('./routes/bulkuploadtable')
const reqpriceroute = require('./routes/reqprice')


app.use('/api/housetype',postrouteht)
app.use('/api/country' , postroute)
app.use('/api/EmployeeBand', postrouteEB)
app.use('/api/signupUsers', postrouteSignup)
app.use('/api/bulkupload', Bulkupload)
app.use('/api/org', postrouteorg)
app.use('/api/housesize',postroutehs)
app.use('/api/relocform', postrouterf)
app.use('/api/hr', postroutehr)
app.use('/api/price', reqpriceroute)

app.get('/' , (req , res)=>{
    res.end('Helloworld With Node JS and Express JS')
})
app.listen(5000 , function(){

    console.log('Node JS and Express Server Started successfully with Nodemon ;{ now see}')

})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

 
app.use(express.static('public'))    // static folder
app.set('view engine','ejs')             // set the template engine

var excelStorage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
         cb(null,'./public/excelUploads');    // file added to the public folder of the root directory
    },  
    filename:(req,file,cb)=>{  
         cb(null,file.originalname);  
    }  
});  

var excelUploads = multer({storage:excelStorage}); 
       app.get('/',(req,res) => {
       res.render('index.ejs');
})
// upload excel file and import in mongodb
app.post('/bulkupload', excelUploads.single('uploadfile'), (req, res) =>{  
    debugger   
    importFile('./public' + '/excelUploads/' + req.file.filename);
            function importFile(filePath){
              //  Read Excel File to Json Data
                var arrayToInsert = [];
                csvtojson().fromFile(filePath).then(source => {
              // Fetching all data from each row
                for (var i = 0; i < source.length; i++) {
                    console.log(source[i]["email"])
                    var singleRow = {
                        email: source[i]["email"],
                        username: source[i]["username"],
                        password : source[i]['password'],
                        roles : source[i]['roles'],
                        //designation: source[i]["designation"]
                    };
                    arrayToInsert.push(singleRow);
                }
             //inserting into the table Countries
             Bulkupload.insertMany(arrayToInsert, (err, result) => {
                    if (err) console.log(err);
                        if(result){
                            console.log("File imported successfully.");
                            res.redirect('/')
                        }
                    });
                });
           }
})