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
        <div class="moderation" v-if="userId == storageUserId || admin == 'true'">
            <img src="../../public/modify.png" alt="" @click.prevent="modify()">
            <img src="../../public/delete.png" alt="" @click.prevent="remove()">
        </div>

        <article class="hidden" ref="modifyStoryForm" id="modifyStoryForm">
        <h2>Nouvelle histoire :</h2>
        <form id="newStoryForm" @submit.prevent="onSubmit">
            <div>
                <label for="storyTitle">Titre* :</label>
                <input type="text" id="title" name="title" required ref="title" v-model="title">
            </div>
            <div id="storyDiv">
                <label for="story">Racontez nous* :</label>
                <textarea name="story" id="story" cols="30" rows="30" required ref="story" v-model="story"></textarea>
            </div>
            <div>
                <label for="storyType">C'est l'histoire d'un :</label>
                <select name="storyType" id="storyType" required ref="storyType" v-model="storyType">
                    <option v-for="storyType of storyTypesList" :key="storyType.name" :value="storyType.name">{{storyType.name}}</option>
                </select>
            </div>
            <div>
                <label for="storyPicture">Illustrez votre histoire* :</label>
                <input type="file" id="storyPicture" name="storyPicture" accept="image/*" ref="storyPicture" @change="onSelect">
            </div>
            <div>
                <label for="illustrator">Illustrateur* :</label>
                <input type="text" id="illustrator" name="illustrator" required ref="illustrator" v-model="picture.illustrator">
            </div>
            <div>
                <label for="caption">Légendez votre image* :</label>
                <input type="text" id="caption" name="caption" required ref="caption" v-model="picture.caption">
            </div>
            <button>Modifier mon histoire</button>
        </form>
    </article>

    <p>{{message}}</p>
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

    .moderation{
        margin-top: 5%;
        margin-bottom: 2%;
    }
</style>

<script>
    
    export default {
        name: 'Story',

        data(){
            return {
                userId : "",
                id : "",
                title : "",
                story : "",
                storyTypeId : "",
                storyType : "",
                picture : {
                    id : "",
                    url : "",
                    illustrator : "",
                    caption : ""
                },

                message : "",

                storageUserId : localStorage.userId,
                admin : localStorage.admin,

                storyTypesList : [],

                file : ""
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
                            this.file = [];
                            this.userId = myJson.Story.userId;
                            this.id = myJson.Story.id;
                            this.title = myJson.Story.title;
                            this.story = myJson.Story.story;
                            this.storyTypeId = myJson.Story.typeId;
                            this.picture.id = myJson.id;
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
            },

            modify(){
                this.getStoryTypes();
                this.$refs.modifyStoryForm.removeAttribute("class", "hidden");
                window.location.hash = "#modifyStoryForm";
            },

            remove(){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "DELETE"
                };
                //envoi de la requête
                fetch("http://localhost:3000/api/stories/" + this.id, options)
                .then(response => {
                    if(response.ok){
                        this.message = "Histoire supprimée.";
                        window.location = window.location.origin;
                    }
                    else{
                        this.message = "Mauvaise réponse du réseau";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.message = "Il y a eu un problème avec l'opération fetch" + error;
                });
            },

            getStoryTypes(){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    }
                }
                //récupération des types d'histoire
                fetch("http://localhost:3000/api/storyTypes/", options)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            this.storyTypesList = [];
                            for(let storyType of myJson){
                                this.storyTypesList.push(storyType);
                                if(storyType.id == this.storyTypeId){
                                    this.storyType = storyType.name;
                                }
                            }
                        })
                        .catch(error => {
                            console.log("Il y a eu un problème avec l'opération fetch : " + error);
                        });
                    }
                    else{
                        this.message = "Impossible de récupérer les types d'histoires";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                });
            },

            onSelect(){
                this.file = this.$refs.storyPicture.files[0];
            },

            onSubmit(){
                //création de l'objet story
                let story = {
                    title : this.title,
                    story : this.story,
                    storyType : this.storyType,
                    illustrator : this.picture.illustrator,
                    caption : this.picture.caption,
                    pictureId : this.picture.id
                };
                //création du formData qui sera envoyé
                const formData = new FormData();
                formData.append("story", JSON.stringify(story));
                if(this.file){
                    formData.append("image", this.file);
                }
                //options du formulaire
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "PUT",
                    body : formData
                };
                //envoi du formulaire
                fetch("http://localhost:3000/api/stories/" + this.id, options)
                .then(response => {
                    if(response.ok){
                        this.message = "Histoire mise à jour.";
                        this.$refs.modifyStoryForm.setAttribute("class", "hidden");
                        window.location.hash = "";
                    }
                    else{
                        this.message = "Mauvaise réponse du réseau.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        },

        beforeMount(){
            this.getStory();
        }
    }
</script>