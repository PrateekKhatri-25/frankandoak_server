const express=require('express');
const { allRoutes } = require('./src/app');
require('dotenv').config();
require('./src/db/config');
const cors=require('cors')


const app=express();
app.use(cors());
app.use(express.json());
app.use('/frankandoak-files',express.static('src/uploads'));
app.use('/frankandoak-file/product',express.static('src/uploads/products'))
app.use('/api', allRoutes);

// app.use('/api',allRoutes);



app.listen(process.env.PORT,()=>{
    console.log('server is running at', process.env.PORT);
})