<template>
    <section class="container">
        <h1>Votre espace auteur</h1>
        <article>
            <h2>Profil :</h2>
            <form class="profilForm" id="newPseudoForm">
                <div>
                    <label for="newPseudo">nouveau pseudo* :</label>
                    <input type="text" id="newPseudo" name="newPseudo" required>
                </div>
                <button>Modifier mon pseudo :</button>
            </form>

            <form class="profilForm" id="newPasswordForm">
                <div>
                    <label for="oldPassword">Ancien mot de passe* :</label>
                    <input type="password" id="oldPassword" name="oldPassword" required>
                </div>
                <div>
                    <label for="newPassword">Nouveau mot de passe* :</label>
                    <input type="password" id="newPassword" name="newPassword" required>
                </div>
                <div>
                    <label for="confirmationNewPassword">Confirmation* :</label>
                    <input type="password" id="confirmationNewPassword" name="confirmationNewPassword" required>
                </div>
                <button>Modifier mon mot de passe</button>
            </form>
        </article>

        <div id="notAdmin">
            <article>
                <h2>Nouvelle histoire :</h2>
                <form id="newStoryForm">
                    <div>
                        <label for="storyTitle">Titre* :</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div id="storyDiv">
                        <label for="story">Racontez nous* :</label>
                        <textarea name="story" id="story" cols="30" rows="30" required></textarea>
                    </div>
                    <div>
                        <label for="storyType">C'est l'histoire d'un :</label>
                        <select name="storyType" id="storyType" required>
                            <option value="Objet">Objet</option>
                            <option value="Lieu">Lieux</option>
                            <option value="Événement">Événement</option>
                            <option value="Personnage">Personnage</option>
                        </select>
                    </div>
                    <button>Publier mon histoire</button>
                </form>
            </article>

            <article>
                <h2>Nouvelle bibliographie :</h2>
                <form id="newBibliographyForm">
                    <div>
                        <label for="title">Titre de l'oeuvre* :</label>
                        <input type="text" id="bibliograhyTitle" name="bibliographyTitle" required>
                    </div>
                    <div>
                        <label for="auther">Auteur* :</label>
                        <input type="text" id="auther" name="auther" required>
                    </div>
                    <div>
                        <label for="translater">Traducteur :</label>
                        <input type="text" id="translater" name="translater">
                    </div>
                    <div>
                        <label for="yearOfPublication">Date de publication* :</label>
                        <input type="text" id="yearOfPublication" name="yearOfPublication" required>
                    </div>
                    <div>
                        <label for="yearOfReissue">Date de réédition :</label>
                        <input type="text" id="yearOfReissue" name="YearOfReissue">
                    </div>
                    <button>Publier ma bibliographie</button>
                </form>
            </article>
        </div>

        <div id="admin">
            <article>
                <h2>Créer un nouvel utilisateur :</h2>
                <form id="newUserForm">
                    <div>
                        <label for="pseudo">Pseudo* :</label>
                        <input type="text" id="pseudo" name="pseudo" required>
                    </div>
                    <div>
                        <label for="password">Mot de passe* : </label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div>
                        <label for="confirmationPassword">Confirmation* :</label>
                        <input type="password" id="confirmationPassword" name="confirmationPassword" required>
                    </div>
                    <button>Créer l'utilisateur</button>
                </form>
            </article>

            <article>
                <h2>Les auteurs du site :</h2>
                <div id="users">

                </div>
            </article>
        </div>
    </section>
</template>

<style scoped>
    article{
        margin-bottom: 20%;
    }

    h2{
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        font-size: 3em;
    }

    form{
        width: 80%;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        margin-bottom: 10%;
    }

    form div{
        display: flex;
        margin-bottom: 5%;
    }

    label{
        display: block;
        font-size: 2em;
    }

    input, textarea, select{
        display: block;
        margin-left: 5%;
    }

    textarea{
        max-width: 85%;
    }

    select{
        font-family: KingthingsCalligraphicaLight;
        font-size: 2em;
    }

    button{
        width: 150px;
        height: 60px;
    }

    .profilForm{
        width: 50%;
    }

    #storyDiv{
        flex-direction: column;
    }
</style>

<script>
    export default {
        name: 'User',

        mounted(){
            //si l'utilisateur n'est pas l'admin, on cache la partie admin
            if(localStorage.admin != "true"){
                const admin = document.getElementById("admin");
                admin.setAttribute("class", "hidden");
            }
            //si l'utilisateur est l'admin
            else{
                //on cache la partie auteur
                const notAdmin = document.getElementById("notAdmin");
                notAdmin.setAttribute("class", "hidden");
                //récupération de tous les utilisateurs
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    }
                };
                fetch("http://localhost:3000/api/auth/", options)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            const users = document.getElementById("users");
                            //mise en page pour chaque utilisateur
                            for(let user of myJson){
                                //seul les utilisateurs non admin apparaissent
                                if(!user.admin){
                                    const newUser = document.createElement("p");
                                    newUser.innerHTML = `${user.pseudo} <img src="./delete.png" alt="croix rouge" id="remove${user.id}">`;
                                    users.appendChild(newUser);
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
            //formulaire de modification du pseudo
            const newPseudoForm = document.getElementById("newPseudoForm");
            newPseudoForm.addEventListener("submit", function(e){
                e.preventDefault();
                //récupération du nouveau pseudo et du userId
                const newPseudoInput = document.getElementById("newPseudo");
                let user = {
                    newPseudo : newPseudoInput.value,
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
                        console.log("Pseudo modifié.");
                    }
                    else{
                        console.log("Mauvaise réponse du réseau.");
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                });
                return false;
            });

            //vérification de la saisie de confirmation
            const newPasswordInput = document.getElementById("newPassword");
            const confirmationNewPasswordInput = document.getElementById("confirmationNewPassword");
            confirmationNewPasswordInput.addEventListener("input", function(e){
                e.preventDefault();
                if(confirmationNewPasswordInput.value != newPasswordInput.value){
                    confirmationNewPasswordInput.setAttribute("class", "invalid");
                    newPasswordInput.setAttribute("class", "invalid");
                }
                else{
                    confirmationNewPasswordInput.setAttribute("class", "valid");
                    newPasswordInput.setAttribute("class", "valid");
                }
            });

            //formulaire de modification du mot de passe
            const newPasswordForm = document.getElementById("newPasswordForm");
            newPasswordForm.addEventListener("submit", function(e){
                e.preventDefault();
                //si le formulaire n'est pas correctement rempli
                if(document.getElementsByClassName("invalid").length > 0){
                    alert("Veuillez remplir correctement le formulaire pour modifier votre pseudo.");
                }
                //si le formulaire est correctement rempli
                else{
                    const oldPasswordInput = document.getElementById("oldPassword");
                    let user = {
                        oldPassword : oldPasswordInput.value,
                        newPassword : confirmationNewPasswordInput.value
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
                            console.log("Mot de passe modifié.");
                        }
                        else{
                            console.log("Mauvaise réponse du réseau.");
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    });
                }
                return false;
            });

            //vérification de la saisie de confirmation
            const passwordInput = document.getElementById("password");
            const confirmationPasswordInput = document.getElementById("confirmationPassword");
            confirmationPasswordInput.addEventListener("input", function(e){
                e.preventDefault();
                if(confirmationPasswordInput.value != passwordInput.value){
                    confirmationPasswordInput.setAttribute("class", "invalid");
                    passwordInput.setAttribute("class", "invalid");
                }
                else{
                    confirmationPasswordInput.setAttribute("class", "valid");
                    passwordInput.setAttribute("class", "valid");
                }
            });

            //formulaire d'ajout d'un utilisateur
            const newUserForm = document.getElementById("newUserForm");
            newUserForm.addEventListener("submit", function(e){
                e.preventDefault();
                //si le formulaire n'est pas correctement rempli
                if(document.getElementsByClassName("invalid").length > 0){
                    alert("Veuillez remplir correctement le formulaire pour ajouter un utilisateur.");
                }
                //si le formulaire est correctement rempli
                else{
                    const pseudo = document.getElementById("pseudo");
                    let user = {
                        pseudo : pseudo.value,
                        password : confirmationPasswordInput.value
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
                            console.log("Utilisateur créé.");
                            window.location.reload();
                        }
                        else{
                            console.log("Mauvaise réponse du réseau.");
                        }
                    })
                    .catch(error => {
                        console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    });
                }
                return false;
            })
        }
    }
</script>