import express, { json } from "express"
import { CertiRoute } from "./routes/certiRoute.js";
import router from "./routes/eventRout.js";



const app = express();

app.use(json());
app.use('/',CertiRoute);
app.use('/event',router);

app.listen(8000,()=>{
    console.log("running on 8000",)
})