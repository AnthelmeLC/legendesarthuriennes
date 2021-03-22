<template>
    <section class="container">
        <h1>Connexion</h1>
        <form id="login-form" name="login-form"  @submit.prevent="onSubmit">
            <div>
                <label for="pseudo">Pseudo :</label>
                <input type="text" id="pseudo" name="pseudo" ref="pseudo" v-model="pseudo">
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" ref="pseudo" v-model="password">
            </div>
            <p class="invalidMessage">{{message}}</p>
            <vue-programmatic-invisible-google-recaptcha ref="recaptcha" sitekey="6LcU-0gaAAAAAFnEAhQSL0m1adF1X2FlnharB2HJ" elementId="recaptcha" @recaptcha-callback="recaptchaCallback"></vue-programmatic-invisible-google-recaptcha>
            <div class="btn-div">
                <button class="biggerBtn">Connexion</button>
            </div>
        </form>
    </section>
</template>

<style scoped>

</style>

<script>
    import VueProgrammaticInvisibleGoogleRecaptcha from "vue-programmatic-invisible-google-recaptcha";
    import secrets from "../../secrets";
    
    export default {
        name: 'Login',

        components : {
            VueProgrammaticInvisibleGoogleRecaptcha
        },

        data(){
            return {
                pseudo : "",
                password : "",

                message : "",

                token : ""
            }
        },
    
        methods : {

            onSubmit(){
                this.$refs.recaptcha.execute();
            },

            recaptchaCallback(recaptchaToken){
                //récupération des données entrées par l'utilisateur
                let user = {
                    pseudo : this.pseudo,
                    password : this.password,
                    captcha : recaptchaToken
                };
                //option de la requête
                const options = {
                    headers : {
                        "Content-type" : "application/json"
                    },
                    method : "POST",
                    body : JSON.stringify({user : user})
                };
                //envoi du formulaire
                fetch(secrets.fetchPath + "api/auth/login", options)
                .then(response => {
                    if(response.ok){
                        //connexion réussie
                        response.json()
                        .then(myJson => {
                            //récupération du token d'authentification, du userId et si l'utilisateur est admin
                            localStorage.clear;
                            localStorage.setItem("userId", myJson.userId);
                            localStorage.setItem("token", myJson.token);
                            localStorage.setItem("admin", myJson.admin);
                            window.location = window.location.origin +"/#/user";
                            window.location.reload();
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
                        })
                    }
                    else{
                        this.message = "Identifiants incorrects.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
                })
            }
        }
    };
</script>