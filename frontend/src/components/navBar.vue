<template>
    <nav id="nav">
        <router-link to="/">Home</router-link> <!--à modifier avec le logo du site ou un logo temporaire-->
        <router-link to="/preface">Préface</router-link>
        <div id="storyTypes" ref="storyTypeDiv">
        
        </div>
        <router-link to="/bibliography">Bibliograhie</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/login" id="login">Connexion</router-link>
        <router-link to="/user" id="userSpaceLink">Espace Auteur</router-link>
        <a id="disconnect">Déconnexion</a>
    </nav>
</template>

<style>
    #nav{
        font-family: GothicUltra;
        width: 10%;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 2em;
        background-color: #efefef;
    }

    a{
        display: block;
        color: black;
        text-decoration: none;
        margin: 0% auto 5% auto;
        padding-top: 5%;
        position: relative;
        padding-left: 10px;
    }

    a::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        transform: scaleX(0);
        transform-origin: left;
        width: 95%;
        height: 2px;
        background-color: red;
        transition: transform 400ms ease-out;
    }

    a:hover::after{
        transform: scaleX(1);
    }

    a.router-link-exact-active{
        color: #1000e6;
    }

    .expand{
        position: relative;
    }

    .expand:hover{
        cursor: pointer;
    }

    .expand:hover div{
        display: block;
        cursor: pointer;
    }

    .unfold{
        position: absolute;
        left: 100%;
        top: 0%;
        background-color: #efefef;
        width: 100%;
    }

    .unfold div{
        margin: 0% auto 5% auto;
        padding-top: 5%;
    }

    #disconnect{
        cursor: pointer;
    }
</style>

<script scoped>
    export default {
        name : "navBar",

        beforeMount(){
            fetch("http://localhost:3000/api/stories/titles/")
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(myJson => {
                        for(let title of myJson){
                            if(!document.getElementById(title.typeId)){
                                const newStoryType = document.createElement("a");
                                newStoryType.setAttribute("class", "expand");
                                newStoryType.innerHTML = `${title.StoryType.name}<div class="unfold hidden" id="${title.typeId}"></div>`;
                                this.$refs.storyTypeDiv.appendChild(newStoryType);
                                const newTitle = document.createElement("a");
                                newTitle.innerHTML = title.title;
                                newTitle.setAttribute("href", window.location.origin + "?id=" + title.id);
                                const hiddenDiv = document.getElementById(title.typeId)
                                hiddenDiv.appendChild(newTitle);
                                newTitle.addEventListener("click", function(e){
                                    e.preventDefault();
                                    window.location = window.location.origin + "/story?id=" + title.id;
                                    return false
                                })
                            }
                            else{
                                const newTitle = document.createElement("a");
                                newTitle.innerHTML = title.title;
                                newTitle.setAttribute("href", window.location.origin + "?id=" + title.id);
                                const hiddenDiv = document.getElementById(title.typeId)
                                hiddenDiv.appendChild(newTitle);
                                newTitle.addEventListener("click", function(e){
                                    e.preventDefault();
                                    window.location = window.location.origin + "/story?id=" + title.id;
                                    return false
                                })
                            }
                        }
                    })
                    .catch(error => console.log("Il y a eu un problème avec l'opération fetch : " + error.message));
                }
                else{
                    console.log("Mauvaise réponse du réseau.");
                }
            })
            .catch(error => console.log("Il y a eu un problème avec l'opération fetch : " + error.message));
        },

        mounted(){
            const disconnect = document.getElementById("disconnect");
            //si utilisateur n'est pas connecté
            if(!localStorage.token){
                //on cache le lien vers l'espace utilisateur et le lien de déconnexion
                const userSpaceLink = document.getElementById("userSpaceLink");
                userSpaceLink.setAttribute("style", "display : none");
                disconnect.setAttribute("style", "display : none");
            }
            else{
                //on cache le boutton de connexion
                const login = document.getElementById("login");
                login.setAttribute("style", "display : none");
                
            }
    
            //boutton déconnexion
            disconnect.addEventListener("click", function(e){
                e.preventDefault();
                //suppression du token d'authentification, tu userId et admin
                localStorage.clear();
                if(window.location.pathname === "/user"){
                    window.location = window.location.origin + "/"
                }
                else{
                    window.location.reload();
                }
                return false
            })
        }
    }
</script>