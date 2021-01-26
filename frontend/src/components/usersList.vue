<template>
    <article>
        <h2>Les auteurs du site :</h2>
        <div id="users" ref="users">

        </div>
    </article>
</template>

<style scoped>

</style>

<script>
    export default {
        name : "usersList",

        mounted(){
            if(localStorage.admin === "true"){
                //récupération de tous les utilisateurs
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    }
                };
                //envoi de la requête
                fetch("http://localhost:3000/api/auth/", options)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            const usersDiv = this.$refs.users;
                            //mise en page pour chaque utilisateur
                            for(let user of myJson){
                                //seul les utilisateurs non admin apparaissent
                                if(!user.admin){
                                    const newUser = document.createElement("p");
                                    newUser.innerHTML = `${user.pseudo} <img src="./delete.png" alt="croix rouge" id="remove${user.id}">`;
                                    usersDiv.appendChild(newUser);
                                    //boutton pour supprimer un utilisateur
                                    const remove = document.getElementById("remove" + user.id);
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
                                        fetch("http://localhost:3000/api/auth/" + user.id, options)
                                        .then(response => {
                                            if(response.ok){
                                                console.log("Utilisateur supprimé.");
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
    }
</script>



