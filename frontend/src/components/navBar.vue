<template>
    <nav id="nav">
        <a @click="navDeployement" id="navDeployer" ref="navDeployer" class="hidden"><img src="../assets/images/menu.png" alt="trois traits horizontaux parallèles blanc"></a>
        <div ref="nav" id="menu">
            <router-link to="/"><img src="../assets/images/logo-white.png" alt="Un livre ouvert blanc." title="Accueil"></router-link>
            <router-link v-for="(storyType) of storyTypes" :key="storyType.id" :to="'/storytype?id=' + storyType.id" class="expand">{{storyType.name}}
                <div class="hidden unfold">
                    <router-link v-for="title of titles[storyType.name]" :key="title.id" :to="'/story?id=' + title.id">{{title.title}}</router-link>
                </div>
            </router-link>
            <router-link to="/bibliography">Bibliographie</router-link> 
            <router-link to="/contact">Contact</router-link>
            <a class="expand" @click="deploy">
                <img src="../assets/images/settings.png" alt="Un engrange blanc" title="paramètres">
                <div class="unfold" :class="{'hidden' : hidden}" ref="settings">
                    <a>Police :<br><div @click="changeFontMode()" class="back" title="police d'écriture"><div :class="{'right' : unstyled}" class="front"></div><div class="stylized">A</div><div class="unstyled">A</div></div></a>
                    <a>Thème :<br><div @click="changeColorMode()" class="back" title="thème de couleurs"><div :class="{'right' : dark}" class="front"></div><div>off</div><div>on</div></div></a>
                </div>
            </a>
        </div>
    </nav>
</template>

<style scoped>
    #nav{
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        font-size: 1.25em;
        z-index: 1000;
    }

    #navDeployer{
        width: fit-content;
        height: fit-content;
        border: 2px solid white;
        border-radius: 5px;
        cursor: pointer;
        margin: 2px;
    }

    #navDeployer img{
        vertical-align: middle;
    }

    #menu{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    a{
        padding-left: 10px;
        padding-right: 10px;
    }

    a img{
        width: 32px;
        height: 32px;
    }

    .expand{
        position: relative;
    }

    .expand:hover{
        cursor: pointer;
    }

    .expand:hover .unfold{
        display: block;
        cursor: pointer;
    }

    .unfold{
        position: absolute;
        left: 0%;
        top: 100%;
        padding-top: 30px;
        min-width: 100%;
        opacity: 0.95;
    }

    .unfold a{
        margin-bottom: 20px;
        width: 100%;
        white-space: nowrap;
    }

    .back{
        width: 60px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        justify-content: space-between;
        position: relative;
        cursor: pointer;
    }

    .back div{
        width: 26px;
        height: 26px;
        margin: 0;
        text-align: center;
        border-radius: 50%;
    }

    .front{
        position: absolute;
        left: 2px;
        top: 2px;
    }

    .right{
        left: 32px;
    }

    @media all and (max-width : 900px){
        #nav{
            width: fit-content;
            max-width: 100%;
            height: fit-content;
            max-height: 100vmax;
        }

        #navDeployer{
            display: block;
        }

        #menu{
            display: none;
        }

        a{
            display: block;
            margin-bottom: 10%;
        }

        .unfold{
            left: 100%;
            top: -350%;
        }
    }
</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "navBar",

        data(){
            return {
                storyTypes : [],
                titles : [],
                unstyled : localStorage.unstyled,
                dark : localStorage.dark,
                hidden : true,
                deployed : ""
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
                                    this.storyTypes.push({"id" : title.storytype.id, "name" : title.storytype.name});
                                    this.titles[storyType] = [];
                                    this.titles[storyType].push(title);
                                }
                                else{
                                    this.titles[storyType].push(title);
                                }
                            }
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                        });
                    }
                    else{
                        console.log("Mauvaise réponse du réseau.");
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                });
            },

            changeFontMode(){
                if(localStorage.unstyled){
                    document.getElementById("app").className = document.getElementById("app").className.replace("unstyled", "stylized");
                    localStorage.removeItem("unstyled");
                    this.unstyled = "";
                }
                else{
                    document.getElementById("app").className = document.getElementById("app").className.replace("stylized", "unstyled");
                    localStorage.setItem("unstyled", true);
                    this.unstyled = true;
                }
            },

            changeColorMode(){
                if(localStorage.dark){
                    document.getElementById("app").className = document.getElementById("app").className.replace("dark", "light");
                    localStorage.removeItem("dark");
                    this.dark = "";
                }
                else{
                    document.getElementById("app").className = document.getElementById("app").className.replace("light", "dark");
                    localStorage.setItem("dark", true);
                    this.dark = true;
                }
            },

            deploy(){
                if(navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                    || this.deployed == true
                ){
                    if(this.hidden){
                        this.hidden = "";
                    }
                    else{
                        this.hidden = true;
                    }
                }
            },

            navDeployement(){
                if(this.deployed){
                    this.$refs.nav.style.display = "none";
                    this.deployed = "";
                }
                else{
                    this.$refs.nav.style.display = "block";
                    this.deployed = true;
                }
            }
        },

        beforeMount(){
            this.getTitles();
        }
    };
</script>