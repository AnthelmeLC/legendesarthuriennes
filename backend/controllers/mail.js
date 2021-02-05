const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const secrets = require("../secrets");

exports.mailto = (req, res, next) => {
    const token = req.body.captcha;
    const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secrets.captchaSecretKey}&response=${token}`;

    //si le token n'existe pas ou est vide
    if(token === null || token === undefined || token === ""){
        return res.status(401).json({error : "Token invalide."});
    }
    //si le token existe
    else{
        //options de la requête
        const options = {
            method : "POST"
        };
        //vérification du token auprès du service recaptcha de google
        fetch(url, options)
        .then(response => {
            response.json()
            .then(myJson => {
                //si la vérification est un succes
                if(myJson.success === true){
                    //paramètres du mail
                    const message = {
                        from : "contact.labibliothequedemerlin@gmail.com",
                        to : "contact.labibliothequedemerlin@gmail.com",
                        subject : req.body.topic,
                        html : `<em>Envoyé par ${req.body.pseudo}</em><br>${req.body.message}`
                    };
                    
                    //paramètre de l'envoi
                    const transport = nodemailer.createTransport({
                        host : "smtp.gmail.com",
                        port : 587,
                        auth : {
                            user : "contact.labibliothequedemerlin",
                            pass : secrets.mailPassword
                        }
                    });
                
                    //envoi du mail
                    transport.sendMail(message)
                    .then(() => res.status(200).json({message : "mail envoyé"}))
                    .catch(error => res.status(500).json({error}));
                }
                //si la vérification a échouée
                else{
                    return res.status(401).json({error : "Token invalide"});
                }
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    }
}