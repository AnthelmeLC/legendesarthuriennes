<template>
    <article>
        <h2>Nouvelle histoire :</h2>
        <form id="newStoryForm" @submit.prevent="onSubmit">
            <div>
                <label for="storyTitle">Titre <span class="invalidMessage">*</span> :</label>
                <input type="text" id="title" name="title" required ref="title" v-model="story.title">
            </div>
            <div id="storyDiv">
                <label for="story">Racontez nous <span class="invalidMessage">*</span> :</label>
                <textarea name="story" id="story" rows="10" required ref="story" v-model="story.story"></textarea>
            </div>
            <div>
                <label for="storyType">C'est l'histoire d'un <span class="invalidMessage">*</span> :</label>
                <select name="storyType" id="storyType" required ref="storyType" v-model="story.storyType">
                    <option v-for="storyType of storyTypesList" :key="storyType.name" :value="storyType.name">{{storyType.name}}</option>
                </select>
            </div>
            <div>
                <label for="storyPicture">Illustrez votre histoire <span class="invalidMessage">*</span> :</label>
                <input type="file" id="storyPicture" name="storyPicture" accept="image/*" ref="storyPicture" @change="onSelect">
            </div>
            <div>
                <label for="illustrator">Illustrateur <span class="invalidMessage">*</span> :</label>
                <input type="text" id="illustrator" name="illustrator" required ref="illustrator" v-model="story.illustrator">
            </div>
            <div>
                <label for="caption">Légendez votre image <span class="invalidMessage">*</span> :</label>
                <input type="text" id="caption" name="caption" required ref="caption" v-model="story.caption">
            </div>
            <p ref="message">{{message}}</p>
            <p v-if="this.message">Rafraichissez la page pour qu'elle <br>apparaisse dans votre barre de navigation.</p>
            <p class="requiredFields"><span class="invalidMessage">*</span> Champs obligatoires</p>
            <div class="btn-div">
                <button class="biggerBtn">Publier mon histoire</button>
            </div>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "storyPost",
    
        data(){
            return {
                storyTypesList : [],

                story : {
                    title : "",
                    story : "",
                    storyType : "",
                    illustrator : "",
                    caption : ""
                },
    
                file : "",
    
                message : ""
            }
        },
    
        methods : {
            onSelect(){
                this.file = this.$refs.storyPicture.files[0];
            },
    
            onSubmit(){       
                //création de l'objet story
                let story = {
                    ...this.story,
                    userId : localStorage.userId
                };
                //création du formData qui sera envoyé
                const formData = new FormData();
                formData.append("image", this.file);
                formData.append("story", JSON.stringify(story));
                //options du formulaire
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "POST",
                    body : formData
                };
                //envoi du formulaire
                fetch(secrets.fetchPath + "api/stories/", options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et vidage des données
                        this.$refs.message.setAttribute("class", "validMessage");
                        this.message = "Histoire créée.";
                        this.story.title = "";
                        this.story.story = "";
                        this.story.storyType = "";
                        this.story.illustrator = "";
                        this.story.caption = "";
                        this.file = "";
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage");
                        this.message = "L'histoire n'a pas pu être créée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage");
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            },

            getStoryTypes(){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    }
                };
                //récupération des types d'histoire
                fetch(secrets.fetchPath + "api/storyTypes/", options)
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            //enregistrement des données
                            for(let storyType of myJson){
                                this.storyTypesList.push(storyType);
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
            }
        },
    
        beforeMount(){
            this.getStoryTypes();
        }
    };
</script>