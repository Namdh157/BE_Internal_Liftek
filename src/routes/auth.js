import { Router } from "express";
import { signIn, signUp,refreshToken } from "../controllers/auth.js";

const routerAuth = Router();

routerAuth.post('/signup', signUp)
routerAuth.post('/signIn', signIn)
routerAuth.get('/refresh-token', refreshToken)

export default routerAuth;
