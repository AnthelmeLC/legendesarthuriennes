<template>
    <section class="container">
        <h1>{{storyType}}</h1>
        <div class="content">
            <ul>
                <li><p>{{message}}</p></li>
                <li v-for="(title) of titles" :key="title.id"><router-link :to="'/story?id='+title.id">{{title.title}}</router-link></li>
            </ul>
            <img src="../../public/big-logo.png" alt="" class="logo">
        </div>
    </section>
</template>

<style scoped>
    .content{
        display: flex;
    }
    ul{
        width: 50%;
        list-style-type: none;
    }

    li{
        margin-bottom: 20px;
        width: 100%;
    }

    a{
        width: fit-content;
        font-size: 1.5em;
    }

    img{
        height: fit-content;
        align-self: center;
    }

    @media all and (max-width : 900px){
        .content{
            flex-direction: column;
        }

        ul{
            width: 100%;
        }
    }
</style>

<script>
    import secrets from '../../secrets';

    export default {
        name: 'StoryType',
        
        data(){
            return {
                storyType : "",
                titles : [],
                message : ""
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
                const typeId = window.location.href.split("?id=")[1];
                //récupération des titres d'histoires
                fetch(secrets.fetchPath + "api/stories/getAllByStoryType/" + typeId)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {   
                            this.storyType = myJson.storyType.name; 
                            this.titles = myJson.stories;
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                        });
                    }
                    else{
                        this.message = "Les titres n'ont pas pu être récupérés.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error.message);
                });
            }
        },

        beforeMount(){
            this.getTitles();
        }
    };
</script>