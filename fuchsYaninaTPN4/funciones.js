function conexion(){
    fetch('emojis.json')
    .then(response =>response.json())
    .then(data => {
        console.log(data);
    })
    
}
conexion();