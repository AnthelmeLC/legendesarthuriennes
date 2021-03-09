<template>
    <section id="home" class="container">
        <h1>La bibliothèque de Merlin</h1>
        <p>Vous invite à découvrir les légendes arthuriennes au travers de récits résumés et accessibles à tous.</p>
        <p>{{message}}</p>
        <figure class="slideshow">
            <a class="prev" @click="slideIndex -= 1">&#10094;</a>

            <router-link class="slide" v-for="(story, index) of randomStories" :key="story.id" :to="'/story?id=' + story.story.id" v-show="index == slideIndex - 1">
                <div>
                    <img :src="story.url" alt="">
                </div>
                <h2>{{story.story.title}}</h2>
            </router-link>
            
            <a class="next" @click="slideIndex += 1">&#10095;</a>
     
        <div class="dots">
            <span class="dot" :class="{active : index === slideIndex - 1}" v-for="(story, index) of randomStories" :key="index" @click="slideIndex = index + 1"></span>
        </div>
        </figure>
        <p>La légende arthurienne (ou cycle arthurien) est un ensemble de textes écrits au Moyen Âge autour du roi Arthur, de son entourage et de la quête du Graal. Elle est un thème fort de la matière de Bretagne. Il n'existe non pas une légende arthurienne, mais plusieurs. Cela est dû aux nombreux auteurs qui ont assemblé ces traditions au cours des siècles, depuis les premiers moines collecteurs jusqu'aux écrivains qui l'ont enrichie, comme Chrétien de Troyes ou plus récemment Xavier de Langlais. Ainsi, le nom des personnages et les circonstances de leur vie (jeunesse, hauts faits, mort) varient d'une époque à l'autre, d'un pays à l'autre. Il existe cependant une unité de lieu : le royaume de l'île de Bretagne, qui recouvre les territoires du centre, du sud et de l'ouest de la Grande-Bretagne actuelle ainsi qu'une partie non définie de la Bretagne continentale, et une unité de temps : la fin du Ve siècle et le début du VIe siècle quand les Romains viennent de quitter l'Île de Bretagne, période des grandes invasions qui précédèrent et suivirent la chute de l'empire romain d'Occident. Il ne s'agit donc pas, à l'origine, de personnages médiévaux, même si leur popularité en France a été portée par des écrivains du Moyen Âge.</p>
        <figure class="blason">
            <img src="../assets/BlasonRoyaumeArthur.png" alt="D'azur à treize couronnes d'or, 4, 4, 4 et 1.">
            <figcaption>Blason du Roi Arthur, Bretagne Unifiée</figcaption>
        </figure>
        <p>Les auteurs des histoires que vous pourrez lire ici se sont inspirés de multiples lectures que vous pourrez retrouver dans la bibliographie.<br>Ces histoires sont le fruit de recherches poussées et leur but est de synthétiser un bout de légende dans un récit court et facilement compréhensif.</p>
        <p>Certaines parties du cycle arthuriens ayant étées écrites ou réécrites par plusieurs auteurs, il est possible que vous trouviez des incohérences entre les différentes histoires ou avec ce que vous avez pu lire ailleurs.</p>
        <p>Bonne lecture...</p>
        <img src="../../public/big-logo.png" alt="" id="logo">
    </section>
</template>

<style scoped>
    figure{
        text-align: center;
        margin-bottom: 5%;
    }

    .slideshow{
        width: fit-content;
        display: flex;
        margin-right: auto;
        margin-left: auto;
        position: relative;
    }

    .slideshow img{
        object-fit: scale-down;
    }

    .slide{
        position: relative;
    }

    .slide div{
        height: 500px;
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: #efefef;
    }

    .slide h2{
        margin-top: 0;
        background-color: white;
        color: black;
    }

    figcaption{
        font-size: 75%;
        font-family: Times New Roman;
    }

    .prev, .next {
        height: 500px;
        min-width: 100px;
        cursor: pointer;
        color: #2d6ca2;
        font-size: 3em;
        font-weight: bold;
        transition: 0.6s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .prev{
        border-radius: 3px 0 0 3px;
    }

    .next {
        border-radius: 0 3px 3px 0;
    }

    .prev:hover, .next:hover {
        scale: 1.2;
        transition: all ease-in-out 200ms;
    }

    .prev:hover::after, .next:hover::after{
        transform: scaleX(0);
    }

    .dots{
        width: 100%;
        margin: 10px auto 0 auto;
        position: absolute;
        top: 100%;
        
    }

    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 5px;
        background-color: #2d6ca2;
        border-radius: 50%;
        display: inline-block;
        transition: border, scale 300ms ease-in-out;
    }

    .active, .dot:hover {
        scale: 1.5;
        background-color: #2d6ca2;
    }

    #logo{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    h2{
        margin-bottom: 0;
    }

    p{
        text-align: justify;
    }

    a{
        text-decoration: none;
        position: relative;
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
</style>

<script scoped>
    import secrets from '../../secrets';

    export default {
        name: 'Home',

        data(){
            return{
                randomStories : [],
                message : "",

                slideIndex : 0,
                timeoutId : ""
            }
        },

        watch : {
            slideIndex(newIndex){
                clearTimeout(this.timeoutId);
                if(newIndex > this.randomStories.length){
                    this.slideIndex = 1;
                }
                else if(newIndex < 1){
                    this.slideIndex = this.randomStories.length;
                }
                else{
                    this.slideIndex = newIndex; 
                }
                this.timeoutId = setTimeout(this.indexIncrement, 10000);
            }
        },

        methods : {
            getFourRandom(){
                this.randomStories = [];
                fetch(secrets.fetchPath + "api/stories/")
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            this.randomStories = myJson;
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error);
                            this.message = "Il y a eu un problème avec l'opération fetch";
                        });
                    }
                    else{
                        this.message = "Mauvaise réponse du réseau.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            },

            indexIncrement(){
                this.slideIndex ++;
                clearTimeout(this.timeoutId);
                setTimeout(this.timeoutId, 10000);
            }
        },

        beforeMount(){
            this.getFourRandom();
        },

        mounted(){
            clearTimeout(this.timeoutId);
            this.indexIncrement();
        }
    };
</script>