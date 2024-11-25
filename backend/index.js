import express from "express";
import {router} from './Routes/index.js'
import cors from 'cors'

var app= express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use('/api/v1',router);

app.listen("3000",()=>{"port running succesfully"});
