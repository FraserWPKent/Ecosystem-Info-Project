'use server';
import Form from "next/form";
import { neon } from "@neondatabase/serverless";

export async function addNewUser(formData: FormData){
    
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err: Error | null, salt: string) {
    bcrypt.hash(password, salt, async function(err: Error | null, hash: string) {
             await sql.query(`INSERT INTO userdata (username , password, savedecosystems, savedspecies) VALUES ($1, $2, $3, $4)`
                , [email, hash, [], []]);
        });
    });
}
export async function checkPassword(formData: FormData){
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const hash = await sql.query(`SELECT password FROM userdata WHERE username = $1`, [email]);
    console.log(password);
    console.log(hash[0].password);

    bcrypt.compare(password, hash[0].password, function(err : Error | null, result: boolean) {
        if(result){
            console.log("Password Correct");
        }
        else{
            console.log("Password Incorrect");
        }
    });
}