<template>
    <section class="container">
        <h1>Connectez vous!</h1>
        <form id="login-form" name="login-form">
            <div>
                <label for="pseudo">Pseudo :</label>
                <input type="text" id="pseudo" name="pseudo">
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password">
            </div>
            <button>Connexion</button>
        </form>
    </section>
</template>

<style scoped>
    form{
        width: 50%;
        margin-right: auto;
        margin-left: auto;
        position: relative;
    }

    form div{
        display: flex;
        margin-bottom: 5%;
    }

    label{
        display: block;
        font-size: 2em;
    }

    input, textarea{
        display: block;
        margin-left: 5%;
    }

    textarea{
        max-width: 85%;
    }
</style>

<script>
    export default {
        name: 'Login',
    
        mounted(){
            //événement submit du formulaire de connexion
            const login = document.getElementById("login-form");
            login.addEventListener("submit", function(e){
                e.preventDefault();
                //récupération des données entrées par l'utilisateur
                const form = new FormData(login);
                let user = {};
                for(let key of form.keys()){
                    user[key] = form.get(key);
                }
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
                        console.log("Mauvaise réponse du réseau.")
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
                })
                return false
            })
        }
    }
</script>