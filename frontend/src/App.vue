<template>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> <!--à modifier avec le logo du site ou un logo temporaire-->
        <router-link to="/preface">Préface</router-link>
        <a class="expand">
            Personnages
            <div class="hidden unfold">
                <a>Merlin l'enchanteur</a>
            </div>
        </a>
        <a class="expand">
            Lieux
            <div class="hidden unfold">
                <a>test</a>
                <a>test encore</a>
            </div>
        </a>
        <a class="expand">
            Objets
            <div class="hidden unfold">
                <a>test</a>
                <a>test encore</a>
            </div>
        </a>
        <a class="expand">
            Évènements
            <div class="hidden unfold">
                <a>test</a>
                <a>test encore</a>
            </div>
        </a>
        <router-link to="/bibliography">Bibliograhie</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/login" id="login">Connexion</router-link>
        <router-link to="/user" id="userSpaceLink">Espace Auteur</router-link>
        <a id="disconnect">Déconnexion</a>
      </div>
      <router-view/>
    </div>
</template>

<style>
    /*STYLES ET CLASSES GENERAUX*/
    @font-face{
        font-family: "Mirella Script";
        src:url(./assets/mirellascript.ttf) format("truetype");
    }

    @font-face{
        font-family: "KingthingsCalligraphicaLight";
        src:url(./assets/kingthingscalligraphicalight.ttf) format("truetype");
    }

    @font-face{
        font-family: "GothicUltra";
        src:url(./assets/gothicultra.ttf) format("truetype");
    }

    *{
        box-sizing: border-box;
    }

    html, body{
        margin: 0;
        padding: 0;
        background-color: #cc9a46;
    }

    h1{
        font-family: Mirella Script;
        font-size: 4em;
        font-weight: lighter;
        text-decoration: underline;
        text-align: center;
    }

    p{
        font-size: 2em;
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5%;
    }

    .container{
        max-width: 1000px;
        min-height: 100vh;
        margin-right: auto;
        margin-left: auto;
        padding-top: 1px;
        padding-bottom: 20px;
        background-color: #efefef;
    }

    .hidden{
        display: none;
    }

    .invalid{
        border: red solid 3px;
    }

    .valid{
        border: green solid 3px;
    }

    #app{
        font-family: KingthingsCalligraphicaLight, Times New Roman, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: black;
        position: relative;
    }

    button{
            width: 100px;
            height: 50px;
            border-radius: 25%;
            border: none;
            font-family: KingthingsCalligraphicaLight;
            font-size: 1.5em;
            position: absolute;
            right: 0;
            background-color: #2d6ca2;
            color: white;
            cursor: pointer;
    }

    button:hover{
        background-color: #1F496E;
        transition: all 400ms ease-in-out;
    }
</style>

<style scoped>
    /*STYLES NAV*/
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

<script>
    export default {
        name: 'App',
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
                window.location.reload();
                return false
            })
        }
    }
</script>