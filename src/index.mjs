import express, { request, response } from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
// import "./strategies/discord-strategy.mjs"

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/express_tutorial")
.then(() => console.log("Connected to Database"))
.catch((err) => console.log(`Eror: ${err}`))

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
  secret: "anson the dev",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient()
  })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);




const PORT = process.env.PORT || 3000;

// Home route
app.get(
  "/",
  (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;

    response.cookie("hello", "world", {maxAge: 60000 * 60 * 2, signed: true});
    response.status(201).send({ msg: "Hello world" });
  }
);


// app.post("/api/auth", (request, response) => {
//   const {
//     body: { userName, password },
//   } = request;
//   const findUser = mockUser.find((user) => user.userName === userName)
  
//   if (!findUser || findUser.password !== password ) 
//     return response.status(401).send({msg: "BAD CREDENTIALS"});
  

//   request.session.user = findUser;
//   return response.status(200).send(findUser);
// })

// app.get("/api/auth/status", (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     console.log(session)
//   })
//   return request.session.user ? response.status(200).send(request.session.
//     user) : response.status(401).send({msg: "Not Authenticated"});
// })

// app.post("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   const { body: item } = request;
//   const { cart } = request.session;
//   if(cart) {
//     cart.push(item);
//   }
//   else{
//     request.session.cart = [item];
//   }
//   return response.status(201).send(item);
// })


// app.get("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   return response.send(request.session.cart ??  []);
// })


app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.get("/api/auth/discord", passport.authenticate("discord"));
app.get("/api/auth/discord/redirect", passport.authenticate("discord"), (request, response) => {
  response.sendStatus(200);
})


app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.session)
  console.log(request.user);
  return request.user ? response.send(request.user) : response.sendStatus(401);
})

app.post("/api/auth/logout", (request, response) => {
  request.logOut((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// client_secret = WWMqhdGwl5XrK0DyFEkSvgaP7lNDNeeY
//client_id = 1461773218296758336