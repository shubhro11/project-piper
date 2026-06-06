import express from "express"
import sendEmail from "./utils/email.js"


const app = express()

app.use(express.json())



export default app