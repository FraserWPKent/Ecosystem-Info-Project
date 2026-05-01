'use server';
import Form from "next/form";
import { neon } from "@neondatabase/serverless";

export async function addNewUser(formData: FormData){
    
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    // const comment = formData.get('email');
    const password = String(formData.get('password'));
    // const hashedPassword = hashPassword(password);
    // if(hashedPassword === null){
    //     console.log("ERROR OCCURED WHILE HASHING THE PASSWORD");
    // }
    // console.log(hashedPassword);
    // Insert the comment from the form into the Postgres database
    // let response = await sql('SELECT (email) VALUES ($1) from userData', [email]);
    
    await sql.query(`INSERT INTO userData (username , password, savedecosystems, savedspecies) VALUES ($1, $2, $3, $4)`, [email, password, [], []]);

}

// function hashPassword(password:string){
//     const bcrypt = require('bcrypt');
//     // let hash:string;
//     return(bcrypt.hash(password, 10));
// }