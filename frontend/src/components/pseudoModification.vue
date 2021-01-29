<template>
    <form class="profilForm" id="newPseudoForm" @submit.prevent="onSubmit">
        <div>
            <label for="newPseudo">nouveau pseudo* :</label>
            <input type="text" id="newPseudo" name="newPseudo" required ref="newPseudo" @change="onSelect">
        </div>
        <button>Modifier mon pseudo :</button>
        <p>{{message}}</p>
    </form>
</template>

<style scoped>

</style>

<script>
    export default {
        name : "pseudoModification",
    
        data(){
            return {
                newPseudo : "",
                message : ""
            }
        },
    
        methods : {
            onSelect(){
                this.newPseudo = this.$refs.newPseudo.value
            },
    
            onSubmit(){
                let user = {
                    newPseudo : this.newPseudo,
                    userId : localStorage.userId
                };
                //options de la requête
                const options = {
                    headers : {
                        "Content-type" : "application/json",
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "PUT",
                    body : JSON.stringify({
                        pseudo : user.newPseudo,
                        id : user.userId
                    })
                };
                //envoi de la requête
                fetch("http://localhost:3000/api/auth/pseudo/" + localStorage.userId, options)
                .then(response => {
                    if(response.ok){
                        this.message = "Pseudo modifié.";
                        this.newPseudo = "";
                    }
                    else{
                        this.message = "Mauvaise réponse du réseau.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        }
    }
</script>