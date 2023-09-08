import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/libs/prisma";
import bcrypt from "bcrypt"


export async function POST(request: NextRequest){
          try{
          const body = await request.json();
          const {name, email, password} = body;
          if(!email || !password) return  NextResponse.json({message:"Missing data"},{status : 401})
          // check for existing user
const existingUser=await prisma.user.findFirst({where:{email}});
if (existingUser)return NextResponse.json({message:`Email already exists`},{status: 401})

const hashPassword = await bcrypt.hash(password,10)
// create a new user and save it to the database
const user = await prisma.user.create({
          data:{
                    email,name,password: hashPassword
          }
})
if (user){
          return NextResponse.json({message: "User created sucessfully!"})
}
          }catch(err:any){
                    return NextResponse.json({message: err.message}, {status: 500})
          }

}