<template>
    <div>
        <article>
            <h2>Créer un nouvel utilisateur :</h2>
            <form id="newUserForm" @submit.prevent="onSubmit">
                <div>
                    <label for="pseudo">Pseudo* :</label>
                    <input type="text" id="pseudo" name="pseudo" required ref="pseudo" v-model="pseudo">
                </div>
                <div>
                    <label for="password">Mot de passe* : </label>
                    <input type="password" id="password" name="password" required ref="password" v-model="password" @keyup="onSelect">
                </div>
                <div>
                    <label for="confirmationPassword">Confirmation* :</label>
                    <input type="password" id="confirmationPassword" name="confirmationPassword" required ref="confirmationPassword" v-model="confirmationPassword" @keyup="onSelect">
                </div>
                <p ref="postMessage">{{postMessage}}</p>
                <button class="biggerBtn">Créer l'utilisateur</button>
            </form>
        </article>
        <article>
            <h2>Les auteurs du site :</h2>
            <div id="users" ref="users">
                <p v-for="(user, index) of usersList" :key="user.id">{{user.pseudo}}<img src="../../public/delete.png" alt="croix rouge" v-show="!user.deleted" v-on:click.prevent="remove(user.id, index)"></p>
                <p ref="removeMessage">{{removeMessage}}</p>
            </div>
        </article>
    </div>
</template>

<style scoped>

</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "usersList",

        data(){
            return {
                pseudo : "",
                password : "",
                confirmationPassword : "",

                postMessage : "",

                usersList : [],

                removeMessage : ""
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
                    //récupération des données entrées par l'utilisateur
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
                    fetch(secrets.fetchPath + "api/auth/signup", options)
                    .then(response => {
                        if(response.ok){
                            //message à l'utilisateur, vidage des données et récupération de tous les utilisateurs
                            this.$refs.postMessage.setAttribute("class", "validMessage")
                            this.postMessage = "Utilisateur créé.";
                            this.removeMessage = "";
                            this.pseudo = "";
                            this.password = "";
                            this.confirmationPassword = "";
                            this.getUsers();
                        }
                        else{
                            this.$refs.postMessage.setAttribute("class", "invalidMessage")
                            this.postMessage = "Pseudo indisponible.";
                            this.removeMessage = "";
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                        this.$refs.postMessage.setAttribute("class", "invalidMessage")
                        this.postMessage = "Il y a eu un problème avec l'opération fetch";
                        this.removeMessage = "";
                    });
                }
            },

            remove(id, index){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "DELETE"
                };
                //envoi de la requête
                fetch(secrets.fetchPath + "api/auth/" + id, options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et suppression de l'utilisateur dans les données
                        this.$refs.removeMessage.setAttribute("class", "validMessage")
                        this.removeMessage = "Utilisateur supprimé.";
                        this.postMessage = "";
                        this.usersList[index].deleted = true;
                    }
                    else{
                        this.$refs.removeMessage.setAttribute("class", "invalidMessage")
                        this.removeMessage = "Impossible de supprimer cet utilisateur.";
                        this.postMessage = "";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.removeMessage.setAttribute("class", "invalidMessage")
                    this.removeMessage = "Il y a eu un problème avec l'opération fetch";
                    this.postMessage = "";
                });
            },

            getUsers(){
                //si l'utilisateur est admi, récupération de tous les utilisateurs
                if(localStorage.admin === "true"){
                    //options de la requête
                    const options = {
                        headers : {
                            authorization : localStorage.userId + " " + localStorage.token
                        }
                    };
                    //envoi de la requête
                    fetch(secrets.fetchPath + "api/auth/", options)
                    .then(response => {
                        if(response.ok){
                            response.json()
                            .then(myJson => {
                                //enregistrement des données
                                this.usersList = [];
                                for(let user of myJson){
                                    if(!user.admin){
                                        this.usersList.push(user);
                                    }
                                }
                            })
                            .catch(error => {
                                console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                            });
                        }
                        else{
                            console.log("Mauvaise réponse du réseau");
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    });
                }
            }
        },

        beforeMount(){
            this.getUsers();            
        }
    };
</script>



