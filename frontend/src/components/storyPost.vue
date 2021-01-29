<template>
    <article>
        <h2>Nouvelle histoire :</h2>
        <form id="newStoryForm" @submit.prevent="onSubmit">
            <div>
                <label for="storyTitle">Titre* :</label>
                <input type="text" id="title" name="title" required ref="title" v-model="story.title">
            </div>
            <div id="storyDiv">
                <label for="story">Racontez nous* :</label>
                <textarea name="story" id="story" cols="30" rows="30" required ref="story" v-model="story.story"></textarea>
            </div>
            <div>
                <label for="storyType">C'est l'histoire d'un :</label>
                <select name="storyType" id="storyType" required ref="storyType" v-model="story.storyType">
                    <option v-for="storyType of storyTypesList" :key="storyType.name" :value="storyType.name">{{storyType.name}}</option>
                </select>
            </div>
            <div>
                <label for="storyPicture">Illustrez votre histoire* :</label>
                <input type="file" id="storyPicture" name="storyPicture" accept="image/*" ref="storyPicture" @change="onSelect">
            </div>
            <div>
                <label for="illustrator">Illustrateur* :</label>
                <input type="text" id="illustrator" name="illustrator" required ref="illustrator" v-model="story.illustrator">
            </div>
            <div>
                <label for="caption">Légendez votre image* :</label>
                <input type="text" id="caption" name="caption" required ref="caption" v-model="story.caption">
            </div>
            <button>Publier mon histoire</button>
            <p>{{message}}</p>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
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
                fetch("http://localhost:3000/api/stories/", options)
                .then(response => {
                    if(response.ok){
                        this.message = "Histoire créée.";
                        this.story.title = "";
                        this.story.story = "";
                        this.story.storyType = "";
                        this.story.illustrator = "";
                        this.story.caption = "";
                        this.file = "";
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
    
        mounted(){
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
    }
</script>