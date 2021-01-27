<template>
    <nav id="nav">
        <router-link to="/">Home</router-link> <!--à modifier avec le logo du site ou un logo temporaire-->
        <router-link to="/preface">Préface</router-link>
        <div id="storyTypes">
        
        </div>
        <router-link to="/bibliography">Bibliograhie</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
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
                storyTypes : [],
                titles : []
            };
        },

        beforeMount(){
            fetch("http://localhost:3000/api/storyTypes/")
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(myJson => {
                        this.storyTypes = myJson;
                    })
                    .catch(error => console.log("Il y a eu un problème avec l'opération fetch : " + error.message));
                }
                else{
                    console.log("Mauvaise réponse du réseau.");
                }
            })
            .catch(error => console.log("Il y a eu un problème avec l'opération fetch : " + error.message));

            fetch("http://localhost:3000/api/stories/titles/")
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(myJson => {
                        this.titles = myJson;
                        const storyTypesDiv = document.getElementById("storyTypes");
                        for(let storyType of this.storyTypes){
                            const newStoryType = document.createElement("a");
                            newStoryType.innerHTML = `${storyType.name}<div class="unfold hidden" id="${storyType.id}"></div>`;
                            newStoryType.setAttribute("class", "expand");
                            storyTypesDiv.appendChild(newStoryType);
                            const hiddenDiv = document.getElementById(storyType.id);
                            for(let title of this.titles){
                                if(title.typeId === storyType.id){
                                    const newTitle = document.createElement("a");
                                    newTitle.innerHTML = title.title;
                                    newTitle.setAttribute("href", window.location.origin + "?id=" + title.id);
                                    hiddenDiv.appendChild(newTitle);
                                    newTitle.addEventListener("click", function(e){
                                        e.preventDefault();
                                        window.location = window.location.origin + "/story?id=" + title.id;
                                        return false
                                    })
                                }
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