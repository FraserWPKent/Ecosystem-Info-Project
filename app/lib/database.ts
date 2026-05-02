'use server';
import Form from "next/form";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
export async function addNewUser(formData: FormData){
    // let x = 1;
    // console.log(x++);
    const sql = neon(`${process.env.DATABASE_URL}`);
        // console.log(x++);
    const email = String(formData.get('email'));
        // console.log(x++);
    const password = String(formData.get('password'))
        // console.log(x++);
    
    const bcrypt = require('bcryptjs');
        // console.log(x++);
    
    const saltRounds = 10;
        // console.log(x++);
    
    try{
        // console.log(x++);
    
        bcrypt.genSalt(saltRounds, function(err: Error | null, salt: string) {
        bcrypt.hash(password, salt, async function(err: Error | null, hash: string) {
            try{     
                let data = await sql.query(`INSERT INTO userdata (username , password, savedecosystems, savedspecies) VALUES ($1, $2, $3, $4)`
                    , [email, hash, [], []]);
                console.log(data);
                return "Insert Worked";
            } catch(err){
                console.log(err);
                return "Insert Didnt Work";
            }
            });
    });
    }catch(err){
        console.log(err);
    }
}


export async function checkPassword(formData: FormData){
    // let x = 0;  
    // console.log(x++);
    const sql = neon(`${process.env.DATABASE_URL}`);
        // console.log(x++);
    const email = String(formData.get('email'));
        // console.log(x++);
    const password = String(formData.get('password'));
        // console.log(x++);
    const bcrypt = require('bcryptjs');
        // console.log(x++);
    const saltRounds = 10;
        // console.log(x++);
    const hash = await sql.query(`SELECT password FROM userdata WHERE username = $1`, [email]);
        // console.log(x++);
    if(hash.length === 0){
        // console.log("Incorrect Email");
        return "Incorrect Email";
    }
    console.log(password);
    console.log(hash[0].password);
    bcrypt.compare(password, hash[0].password, function(err : Error | null, result: boolean) {
        if(result){
            // console.log("Password Correct");
            return "Password Correct";
        }
        else{
            // console.log("Password Incorrect");
            return "Password Incorrect";
        }
    });
}