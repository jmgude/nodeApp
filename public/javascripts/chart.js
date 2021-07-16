



addData()


function renderChart(data, labels){

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        
    
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Speed Proving Eff',
                backgroundColor: ['rgb(255, 255, 153)','rgb(51, 255, 255)','rgb(51, 255, 153)'],
                borderColor: ['rgb(255, 255, 153)','rgb(51, 255, 255)','rgb(51, 255, 153)'],
                data: data,
            }]
        },
        
    
        // Configuration options go here
        options: 
        {scales: {
          // yAxes: [{
              // ticks: {
                  // beginAtZero:true,
                  //  min: 0,
                  //  max: 500    
               // }
            //  }]
          }}
    })

    
}

 

//uses fetch to get data from txt file, changes to an array and adds to data for chart
function addData(){
fetch('./test.txt')
.then(response => response.text())
.then(fileData => {
    // Do something with your data
    console.log(fileData);

    var data=fileData.split(',');
    labels =["Eff %","Runs","Time Saved(min)"];
    console.log(data)
    renderChart(data,labels);


});
}




addData1()
function renderChart1(data1, labels1){

    var ctx = document.getElementById('myChart1').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        
    
        // The data for our dataset
        data: {
            labels: labels1,
            datasets: [{
                label: "current Warnings",
                backgroundColor: ['rgb(255, 255, 153)','rgb(51, 255, 255)','rgb(51, 255, 153)','rgb(53, 255, 153)'],
                borderColor: ['rgb(255, 255, 153)','rgb(51, 255, 255)','rgb(51, 255, 153)','rgb(53, 255, 153)'],
                data: data1,
            }]
        },
        
    
        // Configuration options go here
        options: 
        {scales: {
          yAxes: [{
               ticks: {
                   beginAtZero:true,
                    
                }
              }]
          }}
    })

    
} 
//uses fetch to get data from txt file, changes to an array and adds to data for chart
function addData1(){
    fetch('./test1.txt')
    .then(response => response.text())
    .then(fileData => {
        // Do something with your data
        console.log(fileData);
    
        var data1=fileData.split(',');
        labels1 =["Eff %","Runs","Time Saved(min)","test"];
        
        renderChart1(data1,labels1);
    
    
    });
    }
