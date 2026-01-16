import { Router } from "express";

const router = Router();

// Products route
router.get("/api/products", (request, response) => {
//  response.cookie("hello", "world", {maxAge: 60000 * 60 * 2});
 console.log(request.headers.cookie);
 console.log(request.cookies);
 console.log(request.signedCookies.hello);
  
  if (request.cookies.hello && request.cookies.hello === "world"){
    response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
  }
  return response.status(403).send({msg:"Sorry, you need the correct cookie"});

});

export default router;