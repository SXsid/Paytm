const express =require("express")
const app = express()
const rootRouter = require("./routes/mainR")
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json()) 



app.use('/api/v1',rootRouter)


app.listen(3000)

