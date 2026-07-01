import express from 'express'
import cors from 'cors'
import authRouter from './routers/auth.route.js'
import employeeRouter from './routers/employee.route.js'
import documentRouter from "./routers/document.route.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth/', authRouter)
app.use("/api/documents", documentRouter)
app.use('/api/employees', employeeRouter)

export default app