<template>
    <form class="profilForm" id="newPseudoForm" @submit.prevent="onSubmit">
        <div>
            <label for="newPseudo">Nouveau pseudo <span class="invalidMessage">*</span> :</label>
            <input type="text" id="newPseudo" name="newPseudo" required ref="newPseudo" v-model="newPseudo">
        </div>
        <p ref="message">{{message}}</p>
        <p class="requiredFields"><span class="invalidMessage">*</span> Champs obligatoires</p>
        <div class="btn-div">
            <button class="biggerBtn">Modifier mon pseudo</button>
        </div>
    </form>
</template>

<style scoped>

</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "pseudoModification",
    
        data(){
            return {
                newPseudo : "",
                message : ""
            }
        },
    
        methods : {    
            onSubmit(){
                //récupération des données entrées par l'utilisateur
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
                fetch(secrets.fetchPath + "api/auth/pseudo/" + localStorage.userId, options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et vidage des données
                        this.$refs.message.setAttribute("class", "validMessage");
                        this.message = "Pseudo modifié.";
                        this.newPseudo = "";
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage");
                        this.message = "Pseudo indisponible.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage");
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        }
    };
</script>