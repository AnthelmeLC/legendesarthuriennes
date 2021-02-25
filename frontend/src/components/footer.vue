<template>
    <footer>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link v-if="!token" to="/login" ref="login">Connexion</router-link>
        <router-link v-if="token" to="/user" ref="userSpaceLink">Espace Auteur.e</router-link>
        <a v-if="token" id="disconnect" ref="disconnect" @click="disconnect">Déconnexion</a>
    </footer>
</template>

<style scoped>
    footer{
        width: 100%;
        min-height: 5vh;
        background-color: #4F1010;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    a{
        display: block;
        color: #fff;
        text-decoration: none;
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
    }

    a::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        transform: scaleX(0);
        transform-origin: left;
        width: 100%;
        height: 2px;
        background-color: #ffd700;
        transition: transform 400ms ease-out;
    }

    a:hover::after{
        transform: scaleX(1);
    }

    a.router-link-exact-active::after{
        transform: scaleX(1);
    }
    #disconnect{
        cursor: pointer;
    }

</style>

<script>
    export default {
        name : "Footer",

        data(){
            return {
                token : localStorage.token
            }
        },

        methods : {
            disconnect(){
                //suppression des données d'authentification
                localStorage.clear();
                this.token = ""
                //si l'utilisateur est dans l'espace auteur, redirection vers la page principale
                if(window.location.href.split("/#/")[1] == "user"){
                    window.location = window.location.origin;
                }
            }
        }
    }
</script>