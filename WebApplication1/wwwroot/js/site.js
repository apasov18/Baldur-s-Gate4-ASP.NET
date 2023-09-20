﻿const connection = new signalR.HubConnectionBuilder()
    .withUrl("/battle")
    .build();

connection.on("Move", info => {
    alert(info);
})

connection.start();
setTimeout(() => {
    connection.invoke("Move","Pasha")
},3000)