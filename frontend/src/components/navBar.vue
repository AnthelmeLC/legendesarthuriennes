<template>
    <nav id="nav">
        <router-link to="/">Home</router-link> <!--à modifier avec le logo du site ou un logo temporaire-->
        <router-link to="/preface">Préface</router-link>
        <div id="storyTypes" ref="storyTypeDiv">
            <a v-for="(storyType) of titles" :key="storyType.id" class="expand">{{storyType}}
                <div class="hidden unfold">
                    <router-link v-for="title of titles[storyType]" :key="title.id" :to="'/story?id='+title.id">{{title.title}}</router-link>
                </div>
            </a>
        </div>
        <router-link to="/bibliography">Bibliograhie</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link v-if="!token" to="/login" ref="login">Connexion</router-link>
        <router-link v-if="token" to="/user" ref="userSpaceLink">Espace Auteur</router-link>
        <a v-if="token" id="disconnect" ref="disconnect" @click="disconnect">Déconnexion</a>
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

        data(){
            return {
                titles : [],
                token : localStorage.token
            }
        },

        methods : {
            disconnect(){
                localStorage.clear();
                this.token = ""
                if(window.location.pathname === "/user"){
                    window.location.pathname = "/";
                }
            }
        },

        mounted(){
            fetch("http://localhost:3000/api/stories/titles/")
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(myJson => {
                        for(let title of myJson){
                            const storyType = title.StoryType.name;
                            if(!this.titles.includes(storyType)){
                                this.titles.push(storyType);
                                this.titles[storyType] = [];
                                this.titles[storyType].push(title);
                            }
                            else{
                                this.titles[storyType].push(title);
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
        }
    }
</script>