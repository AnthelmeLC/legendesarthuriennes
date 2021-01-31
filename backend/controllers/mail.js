const nodemailer = require("nodemailer");

exports.mailto = (req, res, next) => {
    console.log(req.body.topic);
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
    .then(() => res.status(201).json({message : "mail envoyé"}))
    .catch(error => res.status(400).json({error}));
}