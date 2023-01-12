const express = require("express")
const app = express()
const path = require('path')
const logger = require('morgan')
const session = require('express-session')
const nocache = require('nocache')
const flash = require('connect-flash')
const cartdb = require('./model/userschema/Cart')
// const multer = require('multer')

// app.use(async (req,res,next)=>{
//     user_profile = req.session.user_detail
//     if(user_profile){
//                const userid = req.session.user_detail._id;
//                const cartitems = await cartdb.findOne({ owner: mongoose.Types.ObjectId(userid) }).populate("items.product");
//                if( cartitems.items!==null||cartitems.items.length >= 0){
//                    req.session.cartcount = cartitems.items.length
//                    Object.assign(user_profile,{cartcount:  req.session.cartcount})
//                }
//                next()
//            }else{
//             next()
//            }
// })

const adminRouter = require('./routes/adminrouter')
const userRouter = require("./routes/userrouter")

app.use(logger('dev'))
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.resolve('./uploaded_images')));

app.use(express.static(path.resolve('./public')));

app.use(express.json());
app.use(nocache())
app.use(flash())

// app.use(multer)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(session({
    secret:"sessionkey",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:6000000}
}))

app.use('/admin',adminRouter)
app.use('/',userRouter)

// const port = process.env.PORT||3000a@gmail.com
// app.listen(port)

module.exports = app