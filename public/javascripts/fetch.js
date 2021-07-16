



fetch('test.txt')
.then(response => response.text())
.then(data => {
    // Do something with your data
    console.log(data);
});

  console.log('hello');
fetch('chair.jpg').then(response=>{
    console.log(response);
    return response.blob();
})
.then(blob=>{
    console.log(blob);
    document.getElementById('rainbow').src=URL.createObjectURL(blob);
});