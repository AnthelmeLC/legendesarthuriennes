<template>
    <form class="profilForm" id="newPasswordForm" @submit.prevent="onSubmit">
        <div>
            <label for="oldPassword">Ancien mot de passe* :</label>
            <input type="password" id="oldPassword" name="oldPassword" required ref="oldPassword" v-model="oldPassword">
        </div>
        <div>
            <label for="newPassword">Nouveau mot de passe* :</label>
            <input type="password" id="newPassword" name="newPassword" required ref="newPassword" v-model="newPassword" @change="onSelect">
        </div>
        <div>
            <label for="confirmationNewPassword">Confirmation* :</label>
            <input type="password" id="confirmationNewPassword" name="confirmationNewPassword" required ref="confirmationPassword" v-model="confirmationPassword" @change="onSelect">
        </div>
        <button>Modifier mon mot de passe</button>
        <p>{{message}}</p>
    </form>
</template>

<style scoped>

</style>

<script>
    export default {
        name : "passwordModification",
    
        data(){
            return {
                oldPassword : "",
                newPassword : "",
                confirmationPassword : "",
                
                message : ""
            }
        },
    
        methods : {
            onSelect(){
                //si les deux mots de passe ne correspondent pas
                if(this.confirmationPassword != this.newPassword){
                    this.$refs.newPassword.setAttribute("class", "invalid");
                    this.$refs.confirmationPassword.setAttribute("class", "invalid");
                }
                //si les deux mots de passe correspondent
                else{
                    this.$refs.newPassword.setAttribute("class", "valid");
                    this.$refs.confirmationPassword.setAttribute("class", "valid");
                }
            },
    
            onSubmit(){
                //si le formulaire n'est pas correctement rempli
                if(document.getElementsByClassName("invalid").length > 0){
                    alert("Veuillez remplir correctement le formulaire pour modifier votre pseudo.");
                }
                //si le formulaire est correctement rempli
                else{
                    let user = {
                        oldPassword : this.oldPassword,
                        newPassword : this.confirmationPassword
                    };
                    //options de la requête
                    const options = {
                        headers : {
                            "Content-type" : "application/json",
                            authorization : localStorage.userId + " " + localStorage.token
                        },
                        method : "PUT",
                        body : JSON.stringify({
                            oldPassword : user.oldPassword,
                            newPassword : user.newPassword
                        })
                    };
                    //envoi du formulaire
                    fetch("http://localhost:3000/api/auth/password/" + localStorage.userId, options)
                    .then(response => {
                        if(response.ok){
                            this.message = "Mot de passe modifié.";
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