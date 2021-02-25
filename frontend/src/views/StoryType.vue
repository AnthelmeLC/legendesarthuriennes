<template>
    <section class="container">
        <ul>
            <li v-for="(title) of titles" :key="title.id"><router-link :to="'/story?id='+title.id">{{title.title}}</router-link></li>
        </ul>
    </section>
</template>

<style scoped>
    ul{
        width: fit-content;
        padding-top: 20px;
    }

    a{
        color: black;
        font-size: 1.5em;
        width: 100%;
        margin-bottom: 20px;
    }
</style>

<script>
    import secrets from '../../secrets';

    export default {
        name: 'StoryType',
        
        data(){
            return {
                titles : []
            }
        },

        watch : {
            //si l'url change
            $route (){
                this.getTitles();
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
                            this.titles = [];
                            //enregistrement des données
                            for(let title of myJson){
                                if(title.typeId == window.location.href.split("?id=")[1]){
                                    this.titles.push(title);
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