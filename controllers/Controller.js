const fs = require('fs');
const axios=require("axios")
//openweatherAPI key
const API_key ="baa445ab2851a41924195a1c448e193e"
//mapbox
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const model = require('../models/Model.js');

var wifi = require('node-wifi');

exports.home =(req,res) =>{
    
    const city="York"
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        axios.get(url).then((response)=>{
           //console.log(`temp is ${response.data.main.temp}`);
           var Answer = `The Temperature in ${city} is ${response.data.main.temp}`
            res.render('home',{Answer})
    }).catch((error)=>{
console.log(error)
    })
   
}


//const iwlist = require('wireless-tools/iwlist');


//var wifiscanner = require('node-wifiscanner');

//wifiscanner.scan(function(err, data){
//	if (err) {
	//	console.log("Error : " + err);
	//	return;
//	}

//	console.log(data);
//});



//iwlist.scan('wlan0', function(err,networks){
 // if (err){
 //   console.log("error1");
 //   return;
 // }
 // console.log(networks)
//});
    



//var ifconfig = require('wireless-tools/ifconfig');

//ifconfig.status(function(err, status) {
 // console.log(status);
//});













  //controller test file.txt
    
//callback function that reads the txt file, logs the contects and renders the teast page
    exports.test =(req,res) =>{
      wifi.init({
        iface: null // network interface, choose a random wifi interface if set to null
      });
      // Initialize wifi module
      // Absolutely necessary even to set interface to null
 // Scan networks
 wifi.scan((error, networks) => {
  if (error) {
    console.log(error);
  } else {
    console.log(networks);
  }
});
     


         readMyFile()
          function readMyFile(){

            fs.readFile('./public/data/test.txt', 'utf8' , (err, data) => {
              if (err) {
                console.error(err)
                return
              }
              console.log(data)
              res.render('test',{data})
            })
            }
           
            
            }
       
      //callback function that reads the txt file, logs the contects and renders the teast page
  






      exports.xl=(req,res) =>{
        var xlsx=require("xlsx");
        var wb =xlsx.readFile("test.xlsx");
        var ws = wb.Sheets["Sheet1"];
       var data=xlsx.utils.sheet_to_json(ws);
       var value=xlsx.utils.sheet_to_html(ws)
      // console.log(dataa);
       //console.log(ws)
      
        
        //console.log(data)
        //var newData=data.map(function(record){
         // record.Net=record.Sales-record.Cost;

       // })




       ///var first_sheet_name = wb.SheetNames[0];

       ///var address_of_cell = 'A3';
        
        /* Get worksheet */
       /// var worksheet = wb.Sheets[first_sheet_name];
        
        /* Find desired cell */
       /// var desired_cell = worksheet[address_of_cell];
        
        /* Get the value */
       /// var value = (desired_cell ? desired_cell.v : undefined);
///console.log(value)
       // console.log("hi")
       // var xlsx=require("xlsx");
        //var wb =xlsx.readFile("test.xlsx");
       //var ws=wb.sheets["sheet1"];
      // var cell = ws['A1'];
      // var value = (cell ? cell.v : undefined);
        
       // console.log(value)
        
       // var Snames=wb.SheetNames
       // var Snames=wb.Sheets["Sheet1"]
       // console.log(Snames)
       // res.render('xl',{Snames})
       //res.render('xl',{value})
       res.render('xl',{value})
       
    }


exports.RCSA =(req,res) =>{
    res.render('RCSA')
}
exports.assetMapping =(req,res) =>{
    res.render('assetMapping')
}

exports.chart = (req,res) => {
   //var list= readMyFile()
  // console.log(list)
   
    res.render('chart')
}



exports.homePage = (req,res) => {
  //var list= readMyFile()
 // console.log(list)
  
   res.render('homePage')
}
