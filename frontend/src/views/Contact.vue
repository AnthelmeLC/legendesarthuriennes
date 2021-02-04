<template>
    <section id="contact" class="container">
        <h1>Contact</h1>
        <p>N'hésitez pas à me contacter pour tout problème d'accessibilité ou pour toute réclamation.</p>
        <form @submit.prevent="onSubmit" method="POST">
            <div>
                <label for="peuso">Nom Prénom / Pseudo* :</label>
                <input type="text" required name="pseudo" id="pseudo" ref="pseudo" v-model="email.pseudo">
            </div>

            <div>
                <label for="topic">Sujet* :</label>
                <input type="text" required name="topic" id="topic" ref="topic" v-model="email.topic">
            </div>

            <div>
                <label for="message">Message* :</label>
                <textarea name="message" id="message" cols="40" rows="10" required ref="message" v-model="email.message"></textarea>
            </div>
            <vue-recaptcha ref="recaptcha" sitekey="6Le-m0gaAAAAAC9Zh8QMFf5NxUjDOY6OOWUe0s_e" :loadRecaptchaScript="true" @verify="verifyCaptcha" @expired="expiredCaptcha"></vue-recaptcha>
            <p ref="message">{{message}}</p>
            <button>Envoyer</button>
        </form>
    </section>
</template>

<style scoped>

</style>

<script>
    import VueRecaptcha from "vue-recaptcha";
    
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
                console.log(this.captcha);
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
                fetch("http://localhost:3000/api/mail/", options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et vidage des données
                        this.$refs.message.setAttribute("class", "validMessage")
                        this.message = "Email envoyé. Ne tenez pas compte des bordures rouges.";
                        this.email.pseudo = "";
                        this.email.topic = "";
                        this.email.message = "";
                        this.expiredCaptcha();
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "email non envoyé";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                    this.$refs.message.setAttribute("class", "invalidMessage")
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        },

        mounted(){
            this.$refs.recaptcha.reset();
        }
    };
</script>