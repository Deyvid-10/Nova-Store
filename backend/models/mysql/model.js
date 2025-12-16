import mysql from "mysql2/promise";
import { object } from "zod";

const CONFIGURATION = {
  host: "localhost",
  user: "root",
  password: "Contrasena20",
  database: "e-commerce"
};

const connetion = await mysql.createConnection(CONFIGURATION)

export class Model{
    static async getProducts(filter){

        const [products] = await connetion.query(
            `SELECT     t1.products_id, 
                        t1.products_name,
                        t1.products_description,
                        t4.prod_variation_id,
                        t4.prod_variation_color,
                        t4.prod_variation_size,
                        t1.products_price,
                        t1.products_highlights,
                        t1.products_details,
                        t1.products_creation_date,
                        t1.products_category,
                        COUNT(t2.products_coments_rate) AS reviews,
                        FLOOR(AVG(t2.products_coments_rate)) AS rate_total,
                        t3.prod_imgs_url as products_main_img
            FROM products t1
            LEFT JOIN prod_variation t4
            ON t1.products_id = t4.prod_variation_pord_id
            LEFT JOIN products_coments t2
            ON t1.products_id = t2.products_coments_prod_id
            LEFT JOIN prod_imgs t3
            ON t1.products_id = t3.prod_imgs_prod_id
            WHERE t3.prod_imgscol_main = '1' AND (t3.prod_imgs_color = t4.prod_variation_color or t4.prod_variation_color is null)  `
             + filter[0] +
            ` GROUP BY t1.products_id, 
                        t1.products_name,
                        t1.products_description,
                        t1.products_price,
                        t1.products_highlights,
                        t1.products_details,
                        t1.products_creation_date,
                        t1.products_category,
                        t4.prod_variation_color,
                        t4.prod_variation_size,
                        t4.prod_variation_id,
                        t3.prod_imgs_url 
                        ` 
                 + filter[1],
            [...filter[2]]
        )
        
        
        return products
    }

    static async getOneProduct(products_id){
        const [product] = await connetion.query(
            'SELECT * FROM products WHERE products_id = ?',
            [products_id]
        )

        const [product_imgs] = await connetion.query(
            'SELECT * FROM prod_imgs WHERE prod_imgs_prod_id = ?',
            [products_id]
        )

        const [product_variation] = await connetion.query(
            'SELECT * FROM prod_variation WHERE prod_variation_pord_id = ?',
            [products_id]
        )

        const [product_comments] = await connetion.query(
            `SELECT * 
             FROM products_coments
             LEFT JOIN users
             ON products_coments_user = users_id
             WHERE products_coments_prod_id = ?`,
            [products_id]
        )
        
        return [product[0], product_imgs, product_variation, product_comments]
    }

    static async getLoginCredentials(email){

            const [credentials] = await connetion.query(

            `
            SELECT users_id, users_email, users_img, users_password
            FROM users 
            WHERE users_email = ?
            `,
            [email]
        )

        return credentials
    }

    static async signupValidation(email){

        const [validate] = await connetion.query(
            `
            SELECT users_email
            FROM users 
            WHERE users_email = ?
            `,
            [email]
        )
        
        return validate
    }

    static async insertSignupCredentials(credentials){
        
        await connetion.query(
            "INSERT INTO users (`users_img`, `users_name`, `users_last_name`, `users_email`, `users_password`, `users_address`, `users_postal_code`, `users_phone_number`, `users_credit-card`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [...Object.values(credentials)]
        )
    }

    static async editProfile(credentials){
        console.log(credentials);
        
        await connetion.query(
            "UPDATE users SET users_img = ?, users_name = ?, users_last_name = ?, users_email = ?, users_password = ?, users_address = ?, users_postal_code = ?,  users_phone_number = ?, `users_credit-card` = ? WHERE users_id = 14",
            [...Object.values(credentials)]
        )
    }

    static async getUserData (id){
        const [user] = await connetion.query(
            `SELECT * 
            FROM users
            WHERE users_id = ?`,
            [id]
        )
        return user
    }

     static async insertCartItems(item){
        
        await connetion.query("INSERT INTO prod_cart (prod_cart_quantity, prod_cart_prod_variation_id, prod_cart_prod_id, prod_cart_user_id) VALUES (?, ?, ?, ?)",
        [...Object.values(item)])        
    }

    static async getCartItems(id){
        const [cartItems] = await connetion.query(`
        SELECT c.prod_cart_id,
            c.prod_cart_prod_id,
            c.prod_cart_quantity as quantity,
            c.prod_cart_prod_variation_id,
            p.products_name as prod_name,
            p.products_price as price,
            v.prod_variation_color as color,
            v.prod_variation_size as size,
            img.prod_imgs_url as main_img
    
        FROM prod_cart c
        INNER JOIN products p
        ON c.prod_cart_prod_id = P.products_id
        LEFT JOIN prod_variation v
        ON v.prod_variation_id = c.prod_cart_prod_variation_id
        INNER JOIN prod_imgs img
        ON img.prod_imgs_prod_id = P.products_id
        WHERE c.prod_cart_user_id = ? and prod_imgscol_main = 1
        ORDER BY c.prod_cart_id
        `,
        [id]
        )

        return cartItems
    }

    static async getOneCartItems(item){
        
        const [cartItems] = await connetion.query(`
        SELECT 
            c.prod_cart_quantity as quantity,
            c.prod_cart_id
        FROM prod_cart c
        LEFT JOIN prod_variation v
        ON c.prod_cart_prod_variation_id = v.prod_variation_id
        WHERE (v.prod_variation_id = ? or v.prod_variation_id IS NULL) and c.prod_cart_prod_id = ? and c.prod_cart_user_id = ?
        ORDER BY c.prod_cart_id
        `,
        [item.variation_id, item.product_id, item.user]
        )

        return cartItems
    }

     static async deleteCartItems(cartItemId){
        await connetion.query(`
            delete from prod_cart 
            where prod_cart_id in (?)`,
        [cartItemId])

    }

    static async updateQuantityCartItems(item, quantity){        
        await connetion.query("UPDATE prod_cart SET prod_cart_quantity = ? WHERE prod_cart_id = ?",
        
        [quantity , item])

    }

    static async getHistoricalInfo(id){
        const [historicalInfo] = await connetion.query(`
        SELECT
            h.hist_record_id,
            h.hist_record_prod_id,
            h.hist_record_order_number,
             h.hist_record_item_quantity,
             h.hist_record_delivery_stimate,
             h.hist_record_order_date,
             h.hist_record_shipping_address,
             h.hist_record_payment_method,
             p.products_name as prod_name,
             p.products_price as price,
             v.prod_variation_color as color,
             v.prod_variation_size as size,
             img.prod_imgs_url as main_img
            
        FROM hist_record h
        INNER JOIN products p
        ON h.hist_record_prod_id = p.products_id
        LEFT JOIN prod_variation v
        ON v.prod_variation_id = h.hist_record_variation_id
        INNER JOIN prod_imgs img
        ON img.prod_imgs_prod_id = P.products_id

        WHERE h.hist_record_user_id = ? AND prod_imgscol_main = 1
        ORDER BY h.hist_record_id desc
        `,
        [id]
        )

        return historicalInfo
    }

    static async insertHistoricalInfo(order){
        
       try{
         await connetion.query(`
            INSERT INTO hist_record (hist_record_order_number, 
                                hist_record_delivery_stimate, 
                                hist_record_order_date, 
                                hist_record_item_quantity, 
                                hist_record_variation_id, 
                                hist_record_prod_id, 
                                hist_record_user_id, 
                                hist_record_shipping_address, 
                                hist_record_payment_method) 
            VALUES (?)

        `,
        [order]
        )
       }
       catch(e){
        console.error(e);
        
       }
    }
}