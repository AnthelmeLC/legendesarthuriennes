<template>
    <article>
        <h2>Les types d'histoires :</h2>
        <div id="storyTypes" ref="storyTypes">
            <p v-for="(storyType, index) of storyTypesList" :key="storyType.id">{{storyType.name}}<img src="../assets/images/delete.png" alt="Croix rouge" v-on:click.prevent="remove(storyType.id, index)"></p>            
        </div>
        <form id="storyTypeForm" ref="storyTypesForm" @submit.prevent="onSubmit">
            <div>
                <label for="newStoryType">Nouveau type d'histoires <span class="invalidMessage">*</span> :</label>
                <input type="text" id="newStoryType" name="newStoryType" required ref="newStoryType" v-model="newStoryType">
            </div>
            <p ref="message">{{message}}</p>
            <p class="requiredFields"><span class="invalidMessage">*</span> Champs obligatoires</p>
            <div class="btn-div">
                <button class="biggerBtn">Créer le type d'histoires</button>
            </div>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "storyTypes",
        
        data(){
            return {
                storyTypesList : [],

                newStoryType : "",

                message : ""
            }
        },

        methods : {
            onSubmit(){    
                //options de la requête
                const options = {
                    headers : {
                        "Content-type" : "application/json",
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "POST",
                    body : JSON.stringify({
                        name : this.newStoryType
                    })
                };
                //envoi du formulaire
                fetch(secrets.fetchPath + "api/storyTypes/", options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur, vidage des données et récupération de tous les types d'histoires
                        this.$refs.message.setAttribute("class", "validMessage");
                        this.message = "Type d'histoire créé.";
                        this.newStoryType = "";
                        this.getStoryTypes();
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage");
                        this.message = "Type d'histoires déjà créé.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage");
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
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
                fetch(secrets.fetchPath + "api/storyTypes/" + id, options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et suppresion du type d'histoires dans les données
                        this.$refs.message.setAttribute("class", "validMessage");
                        this.message = "Type d'histoires supprimé.";
                        this.storyTypesList.splice(index);
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage");
                        this.message = "Impossible de supprimer ce type d'histoires.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage");
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            },

            getStoryTypes(){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    }
                };
                //si l'utilisateur est admin, récupération des types d'histoires
                if(localStorage.admin === "true"){
                    fetch(secrets.fetchPath + "api/storyTypes", options)
                    .then(response => {
                        if(response.ok){
                            response.json()
                            .then(myJson => {
                                //enregistrement des données
                                this.storyTypesList = [];
                                for(let storyType of myJson){
                                    this.storyTypesList.push(storyType);
                                }
                            })
                            .catch(error => {
                                console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                            });
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    });
                }
            }
        },

        beforeMount(){
            this.getStoryTypes();
        }
    };
</script>