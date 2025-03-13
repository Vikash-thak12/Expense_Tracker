import express from "express"

const app = express(); 
const port = 3000; 

app.get("/", (req,res) => {
    res.send("Hello this is from server side")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})