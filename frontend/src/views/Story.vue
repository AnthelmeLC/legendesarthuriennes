<template>
    <section class="container">
        <h1>{{title}}</h1>
        <div id="storyDiv">
            <p id="story">{{story}}</p>
            <figure>
                <img :src="picture.url" alt="">
                <figcaption>
                    Illustrateur : {{picture.illustrator}}<br>
                    {{picture.caption}}
                </figcaption>
            </figure>
        </div>
    </section>
</template>

<style scoped>
    #storyDiv{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 25px;
        margin-right: 25px;
        flex-direction: row;
    }

    #story{
        width: 50%;
        margin: 0;
        font-size: x-large;
    }

    figure{
        text-align: center;
        width: 50%;
    }

    figure img{
        max-width: 100%;
    }
</style>

<script>
    
    export default {
        name: 'Story',

        data(){
            return {
                title : "",
                story : "",
                picture : {
                    url : "",
                    illustrator : "",
                    caption : ""
                },

                message : "",

                id : this.$route.params.id
            }
        },

        watch : {
            $route (){
                this.getStory();
            }
        },

        methods : {
            getStory(){
                 //récupération de l'histoire
                const storyId = window.location.href.split("?id=")[1];
                fetch("http://localhost:3000/api/stories/" + storyId)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            this.title = myJson.Story.title;
                            this.story = myJson.Story.story;
                            this.picture.url = myJson.url;
                            this.picture.illustrator = myJson.illustrator;
                            this.picture.caption = myJson.caption;
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                        })
                    }
                    else{
                        this.message = "Mauvaise réponse du réseau.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                })
            }
        },

        beforeMount(){
            this.getStory();
        }
    }
</script>