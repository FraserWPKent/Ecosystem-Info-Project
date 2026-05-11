'use server';
// import Form from "next/form";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
// import bcrypt from "bcryptjs";
export async function addNewUser(formData: FormData){
    // let x = 1;

    //Initializing the connection to the neon sql database and creating vars to store each 
    const sql = neon(`${process.env.DATABASE_URL}`);    
    const username = String(formData.get('username'));
    const email = String(formData.get('email'));
    const password = String(formData.get('password'))
    //Initializing bcrypt and setting up the number of salts we will be using to encrypt a users password
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    try{   
        //Encrypting the users password
        bcrypt.genSalt(saltRounds, function(err: Error | null, salt: string) {
        bcrypt.hash(password, salt, async function(err: Error | null, hash: string) {
            try{     
                // Adds the users content to the neon database alongside two empty arrays to store any specific ecosystems or species they want
                // to mark for later. returns a short message toindicat if the process failed.
                
                // console.log(data);
                let randUUID = randomUUID();
                // await sql.query(`INSERT INTO userdata (uuid) VALUES ($1)`, [randUUID]);
                let data = await sql.query(`INSERT INTO userdata (username , password, email, savedecosystems, savedspecies, uuid) 
                    VALUES ($1, $2, $3, $4, $5, $6)`, [username, hash, email, [], [], randUUID]);
                const cookieStore = await cookies();
                cookieStore.set({
                    name: "EcoInfoAuth",
                    value: randUUID,
                    maxAge: 1800,
                    domain: "",
                    path: "/",
                    secure:true,
                    httpOnly:true,
                    sameSite:"lax",
                });
                return "Insert Worked";
            } catch(err){
                console.log(err);
                return "Insert Didnt Work";
            }
            });
    });
    }catch(err){
        console.log(err);
        return "Something went wrong when generating the password hash";
    }
}


export async function checkPassword(formData: FormData){
    //Initializing a connection to the neon sql database and 
    const sql = neon(`${process.env.DATABASE_URL}`);
    const email = String(formData.get('email'));
    const username = String(formData.get("username"))
    const password = String(formData.get('password'));
    //Initializing the bcrypt instance for checking of the given password
    const bcrypt = require('bcryptjs');

    // fetching the stored password hash.
    const hash = await sql.query(`SELECT password FROM userdata WHERE username = $1`, [username]);
    if(hash.length === 0){
        return "Incorrect Username";
    }
    // console.log(password);
    // console.log(hash[0].password);
    // 
    // Validating the given password's hash matches the stored password's hash. If true returns a success statement otherwise return a fail.
    // This should have built in timeouts for my database but I would need to upgrade my neon plan to get that working and this project isint worth
    // That kind of expense
    bcrypt.compare(password, hash[0].password, async function(err : Error | null, result: boolean) {
        if(result){
            let randUUID = randomUUID();
            await sql.query(`UPDATE cars SET uuid = $1 WHERE username = $2; `, [randUUID, username]);
            const cookieStore = await cookies();
            cookieStore.set({
                name: "EcoInfoAuth",
                value: randUUID,
                maxAge: 1800,
                domain: "",
                path: "/",
                secure:true,
                httpOnly:true,
                sameSite:"lax",
            });
        }
        else{
            return "Password Incorrect";
        }
    });
}

export async function addArrayElementToDatabase(id: string, species: boolean){
    
    const sql = neon(`${process.env.DATABASE_URL}`);
    const cookieStorage = await cookies();
    let dataCol;
    if(species){
        dataCol = "savedspecies";
    }
    else{
        dataCol = "savedecosystems";
    }

    // let temp = "321@321.ca";
    
    let cookie = cookieStorage.get("EcoInfoAuth");
    if(cookie !== undefined){
        try{
            let username = await sql.query(`SELECT username FROM userdata WHERE uuid = $1`, [cookie.value])
            await sql.query(`UPDATE userdata SET $1 = array_append(array_field,$2) WHERE username = $3`, [dataCol, id, username]);
        }catch(err){
            console.log("Adding the saved element to the current users array's failed: " + err);
        }
    }




}