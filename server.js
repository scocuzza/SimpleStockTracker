const express = require('express')
const app = express()
const PORT = 3000



//INDEX
app.get("/", (req,res)=>{
    res.send("This is the index")
})

//SHOW




app.listen(PORT, ()=>{
    console.log("Server is running !");
})