const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const { response } = require("express");

exports.mailto = (req, res, next) => {
    const token = req.body.captcha;
    const secretKey = "6Le-m0gaAAAAAIJ-Uvg0yaRh6PnCKRoh9v7las56";
    const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

    if(token === null || token === undefined || token === ""){
        return res.status(401).json({error : "Token invalide."});
    }
    else{
        const options = {
            method : "POST"
        };
        fetch(url, options)
        .then(response => {
            response.json()
            .then(myJson => {
                if(myJson.success === true){
                    const message = {
                        from : "contact.labibliothequedemerlin@gmail.com",
                        to : "contact.labibliothequedemerlin@gmail.com",
                        subject : req.body.topic,
                        html : `<em>Envoyé par ${req.body.pseudo}</em><br>${req.body.message}`
                    };
                
                    const transport = nodemailer.createTransport({
                        host : "smtp.gmail.com",
                        port : 587,
                        auth : {
                            user : "contact.labibliothequedemerlin",
                            pass : "Jesuisl'ench@nteur2002"
                        }
                    });
                
                    transport.sendMail(message)
                    .then(() => res.status(200).json({message : "mail envoyé"}))
                    .catch(error => res.status(500).json({error}));
                }
                else{
                    return res.status(401).json({error : "Token invalide"});
                }
            })
            .catch(error => res.status(500).json({error}));
            
        })
        .catch(error => res.status(500).json({error}));
    }
}