<template>
    <section class="container">
        <h1>Bibliographie</h1>
        <div ref="bibliographyDiv" id="bibliographyDiv">
            <p ref="message">{{message}}</p>
            <article v-for="(bibliography, index) of bibliographyList" :key="bibliography.id">
                <h2 class="title">{{bibliography.title}}</h2>
                <div class="content">
                    <img :src="bibliography.pictureUrl" alt="">
                    <div class="details">
                        <p>Auteur : {{bibliography.auther}}</p>
                        <p>Traducteur : {{bibliography.translater}}</p>
                        <p>Date de publication : {{bibliography.yearOfPublication}}</p>
                        <p>Date de réédition : {{bibliography.yearOfReissue}}</p>
                    </div>
                    <div class="moderation" v-if="bibliography.userId == userId || admin == 'true'">
                        <img src="../../public/modify.png" alt="" @click.prevent="modify(bibliography)">
                        <img src="../../public/delete.png" alt="" @click.prevent="remove(bibliography.id, index)">
                    </div>
                </div>
            </article>
        </div>
        <article class="hidden" ref="modifyBibliographyForm">
            <h2>Modifiez votre bibliographie :</h2>
            <form id="modifyBibliographyForm" @submit.prevent="onSubmit" name="modify">
                <div>
                    <label for="title">Titre de l'oeuvre* :</label>
                    <input type="text" id="title" name="title" required ref="title" v-model="bibliography.title">
                </div>
                <div>
                    <label for="auther">Auteur* :</label>
                    <input type="text" id="auther" name="auther" required ref="auther" v-model="bibliography.auther">
                </div>
                <div>
                    <label for="translater">Traducteur :</label>
                    <input type="text" id="translater" name="translater" ref="translater" v-model="bibliography.translater">
                </div>
                <div>
                    <label for="yearOfPublication">Date de publication* :</label>
                    <input type="text" id="yearOfPublication" name="yearOfPublication" required ref="yearOfPublication" v-model="bibliography.yearOfPublication">
                </div>
                <div>
                    <label for="yearOfReissue">Date de réédition :</label>
                    <input type="text" id="yearOfReissue" name="yearOfReissue" ref="yearOfReissue" v-model="bibliography.yearOfReissue">
                </div>
                <div>
                    <label for="bibliographyPicture">Aperçu de l'oeuvre :</label>
                    <input type="file" id="bibliographyPicture" name="bibliographyPicture" accept="image/*" ref="bibliographyPicture" @change="onSelect">
                </div>
                <button class="biggerBtn">Publier ma bibliographie</button>
            </form>
        </article>
        
    </section>
</template>

<style scoped>
    #bibliographyDiv article{
        margin-right: 5%;
        margin-left: 5%;
        margin-bottom: 5%;
        border-bottom: solid black 1px;
    }

    #bibliographyDiv h2{
        margin-left: 2%;
        background-color: #efefef;
        color: black;
        text-align: left;
    }

    .content{
        display: flex;
    }

    .details{
        margin-left: 5%;
        min-width: 40%;
    }

    .details p{
        font-size: 1.5em;
        margin: 0 0 10px 0;
        width: fit-content;
    }

    .content img{
        width: 100px;
        display: block;
        height: fit-content;
        margin-left: 5%;
    }

    .moderation{
        flex-direction: column;
        width: 32px;
        margin-left: 20%;
    }

    .moderation img{
        width: 32px;
    }
</style>

<script>
    export default {
        name: 'Bibliography',

        data(){
            return {
                bibliographyList : [],

                bibliography : "",

                file : "",

                message : "",

                userId : localStorage.userId,
                admin : localStorage.admin
            }
        },

        methods : {
            getBibliography(){
                fetch("http://localhost:3000/api/bibliography/")
                .then(response => {
                    if(response.ok){
                        response.json()
                        .then(myJson => {
                            this.bibliographyList = [];
                            for(let bibliography of myJson){
                                this.bibliographyList.push(bibliography);
                            }
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

            modify(bibliography){
                this.$refs.modifyBibliographyForm.removeAttribute("class", "hidden");
                this.bibliography = bibliography;
                window.location.hash = "#modifyBibliographyForm";
            },

            remove(id, index){
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "DELETE"
                };
                //envoi de la requête
                fetch("http://localhost:3000/api/bibliography/" + id, options)
                .then(response => {
                    if(response.ok){
                        this.$refs.message.setAttribute("class", "validMessage")
                        this.message = "Bibliography supprimée.";
                        this.bibliographyList.splice(index, 1);
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "La bibliographie n'a pas pu être supprimée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage")
                    this.message = "Il y a eu un problème avec l'opération fetch" + error;
                });
            },

            onSelect(){
                this.file = this.$refs.bibliographyPicture.files[0];
            },
        
            onSubmit(){
                //si l'utilisateur n'upload pas d'image
                let formData = new FormData;
                formData.append("bibliography" , JSON.stringify(this.bibliography));
                if(this.file){
                    formData.append("image", this.file);
                }
                //options de la requête
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "PUT",
                    body : formData
                };
                //envoi du formulaire
                fetch("http://localhost:3000/api/bibliography/" + this.bibliography.id, options)
                .then(response => {
                    if(response.ok){
                        this.$refs.message.setAttribute("class", "validMessage")
                        this.message = "Bibliographie mise à jour."
                        this.bibliography = "";
                        this.file = "";
                        this.getBibliography();
                        this.$refs.modifyBibliographyForm.setAttribute("class", "hidden");
                        window.location.hash = "";
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "La bibliographie n'a pas pu être modifiée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                    this.$refs.message.setAttribute("class", "validMessage")
                    this.message = "Il y a eu un problème avec l'opération fetch"
                })
            }
        },

        beforeMount(){
            this.getBibliography();
        }
    }
</script>