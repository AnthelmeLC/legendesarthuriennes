<template>
    <article>
        <h2>Les types d'histoires :</h2>
        <div id="storyTypes" ref="storyTypes">
            
        </div>
        <form id="storyTypeForm" ref="storyTypesForm" @submit.prevent="onSubmit">
            <div>
                <label for="newStoryType">Nouveau type d'histoires* :</label>
                <input type="text" id="newStoryType" name="newStoryType" required ref="newStoryType" v-model="newStoryType">
            </div>
            <button>Créer le type d'histoires</button>
            <p>{{message}}</p>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
    export default {
        name : "storyTypes",
        
        data(){
            return {
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
                fetch("http://localhost:3000/api/storyTypes/", options)
                .then(response => {
                    if(response.ok){
                        this.message = "Type d'histoire créé.";
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
        },

        mounted(){
            //si l'utilisateur est admin
            if(localStorage.admin === "true"){
                //récupération des types d'histoires
                fetch("http://localhost:3000/api/storyTypes")
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            const storyTypesDiv = this.$refs.storyTypes
                            for(let storyType of myJson){
                                const newStoryType = document.createElement("p");
                                newStoryType.innerHTML = `${storyType.name} <img src="./delete.png" alt="croix rouge" id="remove${storyType.id}">`
                                storyTypesDiv.appendChild(newStoryType);
                                //boutton pour supprimer le type d'histoire
                                const remove = document.getElementById("remove" + storyType.id);
                                remove.addEventListener("click",function(e){
                                    e.preventDefault();
                                    //options de la requête
                                    const options = {
                                        headers : {
                                            authorization : localStorage.userId + " " + localStorage.token
                                        },
                                        method : "DELETE"
                                    };
                                    //envoi de la requête
                                    fetch("http://localhost:3000/api/storyTypes/" + storyType.id, options)
                                    .then(response => {
                                        if(response.ok){
                                            console.log("Type d'histoires supprimé.");
                                            window.location.reload();
                                        }
                                        else{
                                            console.log("Mauvaise réponse du réseau");
                                        }
                                    })
                                    .catch(error => {
                                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                                    });
                                    return false
                                });
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
    }
</script>