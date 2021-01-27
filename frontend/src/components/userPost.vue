<template>
    <article>
        <h2>Créer un nouvel utilisateur :</h2>
        <form id="newUserForm" @submit.prevent="onSubmit">
            <div>
                <label for="pseudo">Pseudo* :</label>
                <input type="text" id="pseudo" name="pseudo" required ref="pseudo" v-model="pseudo">
            </div>
            <div>
                <label for="password">Mot de passe* : </label>
                <input type="password" id="password" name="password" required ref="password" v-model="password" @change="onSelect">
            </div>
            <div>
                <label for="confirmationPassword">Confirmation* :</label>
                <input type="password" id="confirmationPassword" name="confirmationPassword" required ref="confirmationPassword" v-model="confirmationPassword" @change="onSelect">
            </div>
            <button>Créer l'utilisateur</button>
            <p></p>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
    export default {
        name : "userPost",

        data(){
            return {
                pseudo : "",
                password : "",
                confirmationPassword : "",

                message : ""
            }
        },

        methods : {
            onSelect(){
                //si les deux mots de passe ne correspondent pas
                if(this.confirmationPassword != this.password){
                    this.$refs.password.setAttribute("class", "invalid");
                    this.$refs.confirmationPassword.setAttribute("class", "invalid");
                }
                //si les deux mots de passe correspondent
                else{
                    this.$refs.password.setAttribute("class", "valid");
                    this.$refs.confirmationPassword.setAttribute("class", "valid");
                }
            },

            onSubmit(){
                //si le formulaire n'est pas correctement rempli
                if(document.getElementsByClassName("invalid").length > 0){
                    alert("Veuillez remplir correctement le formulaire pour ajouter un utilisateur.");
                }
                //si le formulaire est correctement rempli
                else{
                    
                    let user = {
                        pseudo : this.pseudo,
                        password : this.confirmationPassword
                    };
                    //options de la requête
                    const options = {
                        headers : {
                            "Content-type" : "application/json",
                            authorization : localStorage.userId + " " + localStorage.token
                        },
                        method : "POST",
                        body : JSON.stringify({
                            pseudo : user.pseudo,
                            password : user.password
                        })
                    };
                    //envoi du formulaire
                    fetch("http://localhost:3000/api/auth/signup", options)
                    .then(response => {
                        if(response.ok){
                            this.message = "Utilisateur créé.";
                            window.location.reload();
                        }
                        else{
                            this.message = "Mauvaise réponse du réseau.";
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                        this.message = "Il y a eu un problème avec l'opération fetch";
                    });
                }
            }
        }
    }
</script>