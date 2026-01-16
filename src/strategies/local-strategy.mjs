import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { compare } from "bcrypt";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside Seralize User`);
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside deseralize User`);
    console.log(`Deseralizin user ID: ${id}`);
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser)
    } catch (err) {
        done(err, null);
    }
})

export default passport.use(
    new Strategy(async (username, password, done) => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
         const findUser = await User.findOne({userName: username});
         if (!findUser) throw new Error("User not found")
         if (!comparePassword(password, findUser.password)) throw new Error("Bad credentials"); 
        done(null, findUser);
        } catch (err) {
           done(err, null); 
        }
    
    })
)