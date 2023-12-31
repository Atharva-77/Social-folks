const exp=require('express')
const dotenv=require('dotenv')
const connectDatabase= require('./config_folder/connectDB')
const cors=require('cors')
const path = require('path')
// //const morgan = require('morgan')


//Loading config file from config folder
dotenv.config({path: './config_folder/config.env'})


const app=exp()
const port=process.env.PORT || 5000
// const port = 3000

app.use(cors())
app.use(exp.json())

connectDatabase()

// //app.use(morgan("dev"))
//routes


app.use('/register',require('./routes/register_route'))
app.use('/login',require('./routes/login_route'))
app.use('/post',require('./routes/post_route'))
app.use('/profile',require('./routes/profile_route'))


//brad
// app.use('/login_brad',require('./routes/login_brad'))
// app.use('/register_brad',require('./routes/register_brad'))


// app.use('/products',require('./routes/products'))
// app.use('/order',require('./routes/order_routes'))
// app.use('/uploadImg',require('./routes/uploadRoutes'))
// app.use('/imgFeature',require('./routes/imageFeatureRoutes'))

//converting uploads to static & importing it here  
// app.use('/uploads',exp.static(path.join(__dirname,'/uploads')))


app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`)
});