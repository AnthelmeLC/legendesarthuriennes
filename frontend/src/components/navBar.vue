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

<style scoped>

</style>

<script>
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
                            newStoryType.innerHTML = `${storyType.name}<div class="hidden" id="${storyType.id}"></div>`;
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
        },

        mounted(){
            
        }
    }
</script>