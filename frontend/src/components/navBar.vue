<template>
    <nav id="nav">
        <router-link to="/"><img src="../../public/logo-white.png" alt=""></router-link>
        <router-link v-for="(storyType) of storyTypes" :key="storyType.id" :to="'/storytype?id=' + storyType.id" class="expand">{{storyType.name}}
            <div class="hidden unfold">
                <router-link v-for="title of titles[storyType.name]" :key="title.id" :to="'/story?id=' + title.id">{{title.title}}</router-link>
            </div>
        </router-link>
        <router-link to="/bibliography">Bibliographie</router-link> 
        <router-link to="/contact">Contact</router-link>
    </nav>
</template>

<style>
    #nav{
        font-family: Fondamento;
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 1.25em;
        background-color: #9c2a2a;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 1000;
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
        left: 0%;
        top: 100%;
        padding-top: 30px;
        background-color: #9c2a2a;
        min-width: 100%;
        opacity: 0.95;
    }

    .unfold a{
        margin-bottom: 20px;
        width: 100%;
        white-space: nowrap;
    }
</style>

<script scoped>
    import secrets from "../../secrets";

    export default {
        name : "navBar",

        data(){
            return {
                storyTypes : [],
                titles : []
            }
        },

        methods : {
            getTitles(){
                //récupération des titres d'histoires
                fetch(secrets.fetchPath + "api/stories/titles/")
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            //enregistrement des données
                            for(let title of myJson){
                                const storyType = title.storytype.name;
                                if(!this.titles.includes(storyType)){
                                    this.titles.push(storyType);
                                    this.storyTypes.push({"id" : title.storytype.id, "name" : title.storytype.name})
                                    this.titles[storyType] = [];
                                    this.titles[storyType].push(title);
                                }
                                else{
                                    this.titles[storyType].push(title);
                                }
                            }
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
                        });
                    }
                    else{
                        console.log("Mauvaise réponse du réseau.");
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
                });
            }
        },

        beforeMount(){
            this.getTitles();
        }
    };
</script>