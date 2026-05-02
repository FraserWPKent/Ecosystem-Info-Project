'use server';
import Form from "next/form";
import { neon } from "@neondatabase/serverless";

export async function addNewUser(formData: FormData){
    let x=6;
    // Connect to the Neon database
    console.log(x+=2);
    const sql = neon(`${process.env.DATABASE_URL}`);
    console.log(x+=2);
    const email = String(formData.get('email'));
    console.log(x+=2);
    const password = String(formData.get('password'));
console.log(x+=2);
    const bcrypt = require('bcrypt');
    console.log(x+=2);
    const saltRounds = 10;
    console.log(x+=2);
    bcrypt.genSalt(saltRounds, function(err: Error | null, salt: string) {
    console.log(x+=2);
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
}


export async function checkPassword(formData: FormData){
    let x = 36;
    console.log(x+=2);
    const sql = neon(`${process.env.DATABASE_URL}`);
    console.log(x+=2);
    const email = String(formData.get('email'));
    console.log(x+=2);
    const password = String(formData.get('password'));
    console.log(x+=2);
    const bcrypt = require('bcrypt');
    console.log(x+=2);
    const saltRounds = 10;
    console.log(x+=2);
    const hash = await sql.query(`SELECT password FROM userdata WHERE username = $1`, [email]);
    console.log(x+=2);
    if(hash.length === 0){
        // throw new Error("Incorrect Email");
        console.log("Incorrect Email");
        return "Incorrect Email";
    }
    x=55;
    console.log(x+=2);
    console.log(password);
    console.log(x+=2);
    console.log(hash[0].password);
    console.log(x+=2);
    bcrypt.compare(password, hash[0].password, function(err : Error | null, result: boolean) {
        if(result){
            console.log("Password Correct");
            // throw new Error("Password Correct");
            return "Password Correct";
        }
        else{
            console.log("Password Incorrect");
            // throw new Error("Password Inccorect");
            return "Password Incorrect";
        }
    });
}