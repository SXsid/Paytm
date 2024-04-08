const express =require("express")
const app = express()
const rootRouter = require("./routes/index")
const cors = require('cors');
const bodyParser = require("body-parser");


app.use(bodyParser.json()) 
app.use(cors())


app.use('/api/v1',rootRouter)

app.get('/',(req,res)=>{
    res.json({
        msg:"hi there"
    })
})

app.listen(3000)

