<template>
    <section class="container">
        <h1>Connectez vous!</h1>
        <form id="login-form" name="login-form" @submit.prevent="onSubmit">
            <div>
                <label for="pseudo">Pseudo :</label>
                <input type="text" id="pseudo" name="pseudo" ref="pseudo" v-model="pseudo">
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" ref="pseudo" v-model="password">
            </div>
            <p>{{message}}</p>
            <button>Connexion</button>
        </form>
    </section>
</template>

<style scoped>
    p{
        color: red;
    }
</style>

<script>
    export default {
        name: 'Login',

        data(){
            return {
                pseudo : "",
                password : "",

                message : ""
            }
        },
    
        methods : {
            onSubmit(){
                let user = {
                    pseudo : this.pseudo,
                    password : this.password
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
                fetch("http://localhost:3000/api/auth/login", options)
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
                            window.location = window.location.origin;
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
    }
</script>