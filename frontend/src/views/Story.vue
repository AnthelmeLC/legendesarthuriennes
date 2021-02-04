<template>
    <section class="container" v-if="id" ref="storyFound">
        <h1>{{title}}</h1>
        <div id="storyDiv">
            <p id="story">{{story}}</p>
            <figure>
                <img :src="picture.url" alt="">
                <figcaption>
                    {{picture.caption}}<br>
                    Illustrateur : {{picture.illustrator}}
                </figcaption>
            </figure>
        </div>
        <div class="moderation" v-if="userId == storageUserId || admin == 'true'">
            <img src="../../public/modify.png" alt="" @click.prevent="modify()">
            <img src="../../public/delete.png" alt="" @click.prevent="remove()">
        </div>

        <article class="hidden" ref="modifyStoryForm" id="modifyStoryForm">
            <h2>Modifier l'histoire :</h2>
            <form id="newStoryForm" @submit.prevent="onSubmit">
                <div>
                    <label for="storyTitle">Titre* :</label>
                    <input type="text" id="title" name="title" required ref="title" v-model="title">
                </div>
                <div id="formStoryDiv">
                    <label for="story">Racontez nous* :</label>
                    <textarea name="story" id="formStory" cols="30" rows="30" required ref="story" v-model="story"></textarea>
                </div>
                <div>
                    <label for="storyType">C'est l'histoire d'un* :</label>
                    <select name="storyType" id="storyType" required ref="storyType" v-model="storyType">
                        <option v-for="storyType of storyTypesList" :key="storyType.name" :value="storyType.name">{{storyType.name}}</option>
                    </select>
                </div>
                <div>
                    <label for="storyPicture">Illustrez votre histoire :</label>
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
                <button class="biggerBtn">Modifier mon histoire</button>
            </form>
        </article>
        <p ref="message">{{message}}</p>
    </section>
    <section v-else class="container" ref="storyNotFound">
        <h1>Les oubliettes</h1>
        <p>L'histoire que vous essayez de consulter n'existe pas.</p>
        <p>Vous trouverez toutes nos histoires disponibles dans la barre de navigation.</p>
        <p>Si vous pensez que c'est une erreur, n'hésitez pas à  nous contacter via notre formulaire.</p>
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

    article{
        margin-bottom: 20%;
    }

    form{
        width: 85%;
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
            //si l'url change
            $route (){
                //si l'histoire a été trouvée
                if(this.$refs.storyFound){
                    //si le formulaire de modification est visible, on le cache
                    if(!window.location.hash && !this.$refs.modifyStoryForm.getAttribute("class")){
                        this.$refs.modifyStoryForm.setAttribute("class", "hidden");
                        window.location.hash = "";
                    }
                    //récupération de la nouvelle histoire
                    this.getStory();
                    this.message="";
                }
                //si l'histoire n'a pas été trouvée
                else{
                    //récupération de la nouvelle histoire
                    this.getStory();
                }
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
                            //enregistrement des données
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
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "L'histoire n'a pas pu être chargée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                })
            },

            modify(){
                //récupération des types d'histoires
                this.getStoryTypes();
                //affichage et déplacement vers le formulaire de modification
                this.$refs.modifyStoryForm.removeAttribute("class", "hidden");
                window.location.hash = "#modifyStoryForm";
                this.message = "";
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
                        window.location = window.location.origin;
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "L'histoire n'a pas pu être supprimée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage")
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
                            //enregistrement des données
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
                        //masquage du formulaire de modification et message à l'utilisateur
                        this.$refs.modifyStoryForm.setAttribute("class", "hidden");
                        this.$refs.message.setAttribute("class", "validMessage")
                        this.message = "Histoire mise à jour.";
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "L'histoire n'a pas pu être mise à jour.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage")
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        },

        beforeMount(){
            this.getStory();
        }
    };
</script>