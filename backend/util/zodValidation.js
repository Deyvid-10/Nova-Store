import {z} from 'zod'

export function loginValidation(data){
    
    const loginCredentials =  z.object({
            email: z.string().nonempty('The email field must not be empty (it is a required field))').email('It must be a valid email address'),
            password: z.string().nonempty('The password field must not be empty (it is a required field)')
            .min(6,  "The password must be at least 6 characters long.")
            .max(50, "The password must be a maximum of 50 characters.")
            .regex(/[A-Z]/, 'The password  must have at least one capital letter'),
        })

        const valitation = loginCredentials.safeParse({
            ...data
        })

    return valitation
} 

export function signupValidation(data){
    const loginCredentials =  z.object({
            avatar: z.string().nonempty("You must choose an avatar"),
            name: z.string().nonempty("The name field is required"),
            "last-name": z.string().nonempty("The last name field is required"),
             
            email: z.string().nonempty('The email field must not be empty (it is a required field))').email('It must be a valid email address'),
            password: z.string().nonempty('The password field must not be empty (it is a required field)')
            .min(6,  "The password must be at least 6 characters long.")
            .max(50, "The password must be a maximum of 50 characters.")
            .regex(/[A-Z]/, 'The password  must have at least one capital letter'),
            "conf-password": z.string().nonempty('The confirm password field must not be empty (it is a required field)'),
            address: z.string().nonempty("The address field must not be empty"),
            "credit-card": z.string().nonempty("The credit card field must not be empty")

        }).refine((data) => data.password === data['conf-password'], {
            message: 'Both the password and the confirmation should be equal',
            path: ['password']
        })

        const valitation = loginCredentials.safeParse({
            avatar: data.avatar[0],
            name: data.name,
            "last-name": data["last-name"],
            email: data.email,
            password: data.password,
            "conf-password": data["conf-password"],
            address: data.address,
            "credit-card": data["credit-card"]
        })
        

        return valitation
}

export function commentValidation(data){
    
    const comments =  z.object({
            comment: z.string().nonempty('The comment field must not be empty'),
            rate: z.string().nonempty(1, 'The rate field must not be empty')
        })

        const valitation = comments.safeParse({
            comment: data.comment,
            rate: data.rate
        })
        console.log(valitation);
        
    return valitation
} 