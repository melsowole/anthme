// adds timestamp to request

import { Request, Response, NextFunction } from "express";

function addTimestamp(req: Request, res: Response, next: NextFunction): void {
  req.body.timestamp = Date.now();
  next();
}

export { addTimestamp };
