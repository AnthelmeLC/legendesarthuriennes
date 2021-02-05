const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

module.exports = (req, res, next) => {
    try{
        //vérification du token de session
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, secrets.salt);
        const userId = decodedToken.userId;                        
        //si l'utilisateur n'est pas authentifié
        if(req.body.userId && req.body.userId != userId){
            throw new Error({message : "User ID non valable!"});
        }
        //si l'utilisateur est authentifié
        else{
            next();
        };
    }
    catch(error){
        res.status(401).json({error : error | "Requête non authentifiée!"});
    };
};