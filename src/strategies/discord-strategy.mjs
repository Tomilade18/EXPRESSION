import passport from "passport";
import Strategy from "passport-discord";

export default passport.use(
    new Strategy({
        clientID: "1461773218296758336",
        clientSecret: "WWMqhdGwl5XrK0DyFEkSvgaP7lNDNeeY",
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
)
)