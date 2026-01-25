import passport from "passport";
import Strategy from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs"


passport.serializeUser((user, done) => {
    console.log(`Inside Seralize User`);
    console.log(user);
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside deseralize User`);
    console.log(`Deseralizin user ID: ${id}`);
    try {
        const findUser = await DiscordUserUser.findById(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        done(err, null);
    }
})

export default passport.use(
    new Strategy({
        clientID: "1461773218296758336",
        clientSecret: "WWMqhdGwl5XrK0DyFEkSvgaP7lNDNeeY",
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            findUser = await DiscordUser.findOne({discordId: profile.id});   
        } catch (err) {
            return done(err, null)
        }

        try {
            if (!findUser) {
                const newUser = new DiscordUser({
                    username: profile.username,
                    discordId: profile.id,
            });
            const newSavedUser = await newUser.save();
            done(null, newSavedUser);
        } 
        } catch (err) {
            console.log(err);
            return done(err, null);
        }

         
        
    }
)
) 