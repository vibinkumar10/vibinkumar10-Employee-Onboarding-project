import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from 'dotenv'

dotenv.config()

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
})