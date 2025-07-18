import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/dashboard']
};

export async function middleware(request: NextRequest){

    const token = request.cookies.get('TokenSalud360');

    if(token === undefined){
        return NextResponse.redirect(new URL('/login', request.url))
    };

    
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY)
        await jwtVerify(token.value, secret);
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
        
    }
}