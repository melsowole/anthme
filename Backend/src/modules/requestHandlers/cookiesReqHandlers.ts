import { Request, Response, NextFunction } from "express";
import { CookieOptions } from "express";

async function readCookie(req: Request, res: Response, next:NextFunction): Promise<void> {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.cookies.loggedIn) res.json({message: `loggedIn cookie read`});
    else res.json({message: 'loggedIn cookie is either expired or does not exist'});
}

async function setCookie(username:string, req: Request, res: Response, next:NextFunction): Promise<void> {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
    
    const settings: CookieOptions = {
        path: '/',
        httpOnly: false,
        maxAge: 1000*60,
        sameSite: 'none'
    };
    
    res.cookie('loggedIn', username, settings)
}

export {readCookie, setCookie}