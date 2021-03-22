<template>
    <footer>
        <router-link to="/about">À propos</router-link>
        <router-link to="/legal">Mentions légales</router-link>
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
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
    }

    a{
        padding-left: 10px;
        padding-right: 10px;
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