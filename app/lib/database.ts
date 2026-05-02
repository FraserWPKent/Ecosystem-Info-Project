'use server';
import Form from "next/form";
import { neon } from "@neondatabase/serverless";
// import bcrypt from "bcryptjs";
export async function addNewUser(formData: FormData){
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'))
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    try{
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
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const hash = await sql.query(`SELECT password FROM userdata WHERE username = $1`, [email]);
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