import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

import { commentValidation, loginValidation, signupValidation } from '../util/zodValidation.js';


export class Controller{
    constructor({ Model }){
        this.Model = Model
    }

    // For consult a filter de products
    getProducts = async (req, res) => {
        
        const { newest, suggestions, sort, search, category, color, size, featured} = req.query
        
        let field = ''
        let order = ''
        let filter = []
        
        // Search & categories filters
        if(search){
            
            field += ' AND UPPER(products_name) like ? '
            filter.push("%" + search.toUpperCase() + "%")
        }

        if(category){
            
            field += ' AND products_category = ? '
            filter.push(category)
        }

        if(color){
            field += ` AND t4.prod_variation_color LIKE ? `
            filter.push("%" + color.toUpperCase() + "%")
        }

        if(size){
            field += ` AND t4.prod_variation_size = ? `
            filter.push(size)
        }

        // Resume filters
        
        if(newest){
            order += 'ORDER BY products_creation_date LIMIT 4'
        }

        if(suggestions){
            order += 'ORDER BY RAND() LIMIT 8'
        }

        if(featured){
            order += 'ORDER BY rate_total DESC LIMIT 4'
        }

        // Sort filters

        if(sort === "lower"){
            order += 'ORDER BY products_price'
        }

        if(sort === "higher"){
            order += 'ORDER BY products_price DESC'
        }

        if(sort === 'Newest'){
            order += 'ORDER BY products_creation_date'
        }

        if(sort === 'popular'){
            order += 'ORDER BY reviews DESC'
        }

        if(sort === 'bestRate'){
            order += 'ORDER BY rate_total DESC'
        }

        


        const completeFilter = [field, order,  [...filter]]
        
        const products = await this.Model.getProducts(completeFilter)
        
        
        return res.json(products);
    }
    // For consult one product
    getOneProduct = async (req, res) => {
        const {id} = req.params
        
        const [products, imgs, variation, comments] = await this.Model.getOneProduct(id)

        const imgsArray = []

        imgs.map((img)=>imgsArray.push({id:img.prod_imgs_id , img: img.prod_imgs_url, color: img.prod_imgs_color}))

        const optionArray = []

        variation.map((prod)=>{prod.prod_variation_color &&  
                    optionArray.push({
                        id: prod.prod_variation_id ,
                        color: prod.prod_variation_color, 
                        style: prod.prod_variation_color_style, 
                        size: prod.prod_variation_size,
                        stock: prod.prod_variation_stock})})
                    
        const commentsArray = []

        comments.map((comment)=> {
            comment.products_coments_id &&
            commentsArray.push({
                id: comment.products_coments_id,
                comment: comment.products_coments_text,
                rate: comment.products_coments_rate,
                date: comment.products_coments_date,
                user_name: comment.users_name,
                user_last_name: comment.users_last_name,
                user_img: comment.users_img,

            })
        })
        

        const completeProduct ={
            products_id: products.products_id,
            products_name: products.products_name,
            products_imgs: imgsArray,
            // products_colors: colorArray,
            // products_sizes:[],
            option: optionArray,
            comments: commentsArray,
            products_description: products.products_description,
            products_price: products.products_price,
            products_status: products.products_status,
            products_creation_date: products.products_creation_date,
            products_details: products.products_details,
            products_highlights: products.products_highlights,
            stock_total: optionArray.reduce((acum, item) => acum + item.stock, 0),
            reviews: commentsArray.length,
            rate_total: commentsArray.reduce((acum, item) => acum + item.rate, 0) / commentsArray.length
        } 

        return res.json(completeProduct);
    }

    
    logIn = async (req, res) => {
        
        const valitation = loginValidation(req.body)

        if(!valitation.success)
        {
            const listOfErrors = valitation.error.format()
            const errorsArray = Object.values(listOfErrors)
            .flatMap((err)=> err?._errors || [])
            
            return res.json({errors: true, errorsList: errorsArray})
        } 
        
        // For compare the password with the password saved
        const [{users_id, users_password}] = await this.Model.getLoginCredentials(req.body.email)
        
        if(!users_password){
            return res.json(({errors: true, errorsList: ['This email does not exist']}))
        }
        
        
        async function verify(password, hashPassword) {
            const compare = await bcrypt.compare(password, hashPassword);
            
            return compare;
        }

        const compare = await verify(req.body.password, users_password)
        
        if(!compare){
            return res.json(({errors: true, errorsList: ['Password incorrect']}))
        }

        const token = jwt.sign({users_id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.cookie("tokenSesion", token, {
            httpOnly: true, 
            secure: true,   
            maxAge: 1000 * 60 * 60
        }).json({correct: "logged"})
    }

    signUp = async (req, res) => {
        const data = req.body
        
        const valitation = signupValidation(data)

        if(!valitation.success)
        {
            const listOfErrors = valitation.error.format()
            const errorsArray = Object.values(listOfErrors)
            .flatMap((err)=> err?._errors || [])
          
            
            return res.json({errors: true, errorsList: errorsArray})
        }  

        const [emaillValidation] = await this.Model.getLoginCredentials(req.body.email)

        if(emaillValidation){
            return res.json(({errors: true, errorsList: ['This email already exist']}))
        } 

        // For hash the password
        async function hashPassword(password) {
            const hashed = await bcrypt.hash(password, 10);
            
            return hashed;
        }

        const hashedPassword = await hashPassword(req.body.password)

        data.password = hashedPassword
        data.avatar = valitation.data.avatar
        
        
        const data2 = {...data}

        delete data2['conf-password']

        await this.Model.insertSignupCredentials(data2)  
        
        const [{users_id}] = await this.Model.getLoginCredentials(req.body.email)
        
        const token = jwt.sign({users_id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        
        return res.cookie("tokenSesion", token, {
            httpOnly: true, 
            secure: true,   
            maxAge: 1000 * 60 * 60
        }).json({correct: "signedup"})
    }

    editProfile = async (req, res) => {

        const token = req.cookies.tokenSesion

        if(!token){
            return res.send({error: "You are not logged"})
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)

        const data = req.body
        
        const valitation = signupValidation(data)

        if(!valitation.success)
        {
            const listOfErrors = valitation.error.format()
            const errorsArray = Object.values(listOfErrors)
            .flatMap((err)=> err?._errors || [])
          
            
            return res.json({errors: true, errorsList: errorsArray})
        }  

        const [emaillValidation] = await this.Model.getLoginCredentials(req.body.email)

        if(emaillValidation && id !== emaillValidation.users_id){
            return res.json(({errors: true, errorsList: ['This email already exist']}))
        } 

        // For hash the password
        async function hashPassword(password) {
            const hashed = await bcrypt.hash(password, 10);
            
            return hashed;
        }

        const hashedPassword = await hashPassword(req.body.password)

        data.password = hashedPassword
        data.avatar = valitation.data.avatar
        data.users_id = id
        
        const data2 = {...data}

        delete data2['conf-password']

        await this.Model.editProfile(data2)  
        
        return res.json({message: "Edited correctly"})
    }


    getUserInfo = async (req, res) => {

        const token = req.cookies.tokenSesion;
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)
        
        const userData = await this.Model.getUserData(id)

        return res.json(userData)
    }

    logOut = (req, res) => {
        
        return res.clearCookie("tokenSesion").json({ message: "Logged Out" })
        
    }

    insertCartItems = async (req, res) => {

        const token = req.cookies.tokenSesion;
        
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)

        const item = req.body
        item.user = id   
        
        const cartItemId = await this.Model.getOneCartItems(item)
        
        if(cartItemId.length !== 0){
            await this.Model.updateQuantityCartItems(cartItemId[0].prod_cart_id, cartItemId[0].quantity + 1)
            return res.send({message: "This item already exist in the cart, quantity +1"})
        }
        
        await this.Model.insertCartItems(item)
        return res.send({message: "Your item is in the cart now"})
    }

    getCartItems = async (req, res) =>{
        const token = req.cookies.tokenSesion;        
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)
        const cartItems = await this.Model.getCartItems(id)
        
        return res.json(cartItems)
    }

    deleteCartItems = async (req, res) =>{

        const {cartId} = req.params
        await this.Model.deleteCartItems(cartId)
        
        return res.json({messge: "Item was deleted"})
    }

    updateQuantityCartItems = async (req, res) =>{

        const {cartId} = req.params
        const {quantity} = req.body

        await this.Model.updateQuantityCartItems(cartId, quantity)
        
        return res.json({messge: "Updated correctly"})
    }

    getHistoricalInfo = async (req, res) =>{

        const token = req.cookies.tokenSesion;        
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)

        const historicalInfo = await this.Model.getHistoricalInfo(id)

        let historicalData = []

        const order_number_array = []
        
        historicalInfo.map((order)=>{

            
            
            
            if(!order_number_array.includes(order.hist_record_order_number)){
                historicalData.push({order_number: order.hist_record_order_number, 
                    products: [],
                    order_date: order.hist_record_order_date,
                    delivery_stimate: order.hist_record_delivery_stimate,
                    shipping_address: order.hist_record_shipping_address,
                    payment_method: order.hist_record_payment_method})
                
                order_number_array.push(order.hist_record_order_number)
            }

            const findOrder = historicalData.find((orderData)=>order.hist_record_order_number === orderData.order_number)
            
            findOrder.products.push({
                prod_id: order.hist_record_prod_id,
                hist_record_id: order.hist_record_id,
                quantity: order.hist_record_item_quantity, 
                product_name: order.prod_name, 
                price: order.price,
                color: order.color,
                size: order.size,
                img: order.main_img})
            
            
        })
        return res.json(historicalData)
    }

    insertHistoricalInfo = async (req, res) =>{

        const token = req.cookies.tokenSesion;        
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)

        const order = req.body

        const emptyCart = order.map(o=>o.cart_id)       

        await this.Model.deleteCartItems(emptyCart)

        delete order.prod_cart_id
        const orderToInsert = order.map(async (o)=>{
            o.user = id
            delete o.cart_id
            
            await this.Model.insertHistoricalInfo(Object.values(o))
        })
        
        

        return res.json({message: "Purchase confirmed"})
    }

    insertComment = async (req, res) =>{

        const token = req.cookies.tokenSesion;        
        
        if(!token){
            return res.send(false)
        }

        const {users_id: id} = jwt.verify(token, process.env.JWT_SECRET)

        const comment = req.body  
        comment.user = id
        
        const valitation = commentValidation(req.body)

        if(!valitation.success)
        {            
            return res.json({errors: true, error: "Some field is empty, please populate"})
        } 
        console.log(comment);
        
        await this.Model.insertComment(comment)

        
        

        return res.json({message: "Comment submited"})
    }
}