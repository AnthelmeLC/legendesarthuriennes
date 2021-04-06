<template>
    <section id="contact" class="container">
        <h1>Contact</h1>
        <div id="contactDiv">
            <form @submit.prevent="onSubmit">
                <div>
                    <label for="peuso">Nom Prénom / Pseudo <span class="invalidMessage">*</span> :</label>
                    <input type="text" required name="pseudo" id="pseudo" ref="pseudo" v-model="email.pseudo">
                </div>

                <div>
                    <label for="topic">Sujet <span class="invalidMessage">*</span> :</label>
                    <input type="text" required name="topic" id="topic" ref="topic" v-model="email.topic">
                </div>

                <div>
                    <label for="message">Message <span class="invalidMessage">*</span> :</label>
                    <textarea name="message" id="message" cols="40" rows="5" required v-model="email.message"></textarea>
                </div>
                <p class="requiredFields"><span class="invalidMessage">*</span> Champs obligatoires</p>
                <vue-recaptcha ref="recaptcha" sitekey="6Le-m0gaAAAAAC9Zh8QMFf5NxUjDOY6OOWUe0s_e" :loadRecaptchaScript=true @verify="verifyCaptcha" @expired="expiredCaptcha"></vue-recaptcha>
                <button>Envoyer</button>
            </form>
            <div id="messageDiv">
                <p ref="message">{{message}}</p>
                <p>N'hésitez pas à me contacter pour tout problème d'accessibilité ou pour toute réclamation.</p>
                <img src="../assets/images/big-logo.png" alt="" class="logo">
            </div>
        </div>
    </section>
</template>

<style scoped>
    #contactDiv{
        display: flex;
        align-items: center;
        margin-right: 25px;
        margin-left: 25px;
    }

    form{
        width: 60%;
        margin-right: 20px;
    }

    #messageDiv{
        width: 40%;
    }

    @media all and (max-width : 900px){
        #contactDiv{
            flex-direction: column;
        }

        form{
            width: 95%;
        }

        #messageDiv{
            width: 95%;
        }
    }
</style>

<script>
    import VueRecaptcha from "vue-recaptcha";
    import secrets from "../../secrets";
    
    export default {
        name: 'Contact',

        components : {
            VueRecaptcha
        },

        data(){
            return {
                email : {
                    pseudo : "",
                    topic : "",
                    message : ""
                },

                message : "",

                captcha : ""
            }
        },

        methods : {
            verifyCaptcha(response){
                this.captcha = response;
            },

            expiredCaptcha(){
                this.captcha = "";
                this.$refs.recaptcha.reset();
            },

            onSubmit(){
                this.message = "Envoi en cours, veuillez patienter...";
                //récupération des données entrées par l'utilisateur
                const mail = {
                    captcha : this.captcha,
                    pseudo : this.email.pseudo,
                    topic : this.email.topic,
                    message : this.email.message
                };
                //options de la requête
                const options = {
                    headers : {
                        "Content-type" : "application/json"
                    },
                    method : "post",
                    body : JSON.stringify({
                        captcha : mail.captcha,
                        pseudo : mail.pseudo,
                        topic : mail.topic,
                        message : mail.message
                    })
                };
                //envoi du formulaire
                fetch(secrets.fetchPath + "api/mail/", options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et vidage des données
                        this.$refs.message.setAttribute("class", "validMessage");
                        this.message = "Email envoyé. Ne tenez pas compte des bordures rouges.";
                        this.email.pseudo = "";
                        this.email.topic = "";
                        this.email.message = "";
                        this.expiredCaptcha();
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage");
                        this.message = "email non envoyé";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                    this.$refs.message.setAttribute("class", "invalidMessage");
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        },

        mounted(){
            this.$refs.recaptcha.reset();
        }
    };
</script>