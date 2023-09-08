import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export async function  middleware(request:NextRequest){
          const token = await getToken({req:request, secret: process.env.SECRET})
          const pathname =  request.nextUrl.pathname
          const isPublic = pathname == "/login" || pathname == "/register"
          console.log()
          if (isPublic && token ){
                    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
          }
          if (pathname == "/dashboard" && !token){
                    return NextResponse.redirect(new URL("/login", request.nextUrl))
          }
}


export const config = {
          matcher:[
                   
                    "/login",
                    "/register",
                    "/dashboard"
          ]
}