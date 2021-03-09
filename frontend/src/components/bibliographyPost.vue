<template>
    <article>
        <h2>Nouvelle bibliographie :</h2>
        <form id="newBibliographyForm" @submit.prevent="onSubmit">
            <div>
                <label for="title">Titre de l'oeuvre <span class="invalidMessage">*</span> :</label>
                <input type="text" id="title" name="title" required ref="title" v-model="bibliography.title">
            </div>
            <div>
                <label for="auther">Auteur <span class="invalidMessage">*</span> :</label>
                <input type="text" id="auther" name="auther" required ref="auther" v-model="bibliography.auther">
            </div>
            <div>
                <label for="translater">Traducteur :</label>
                <input type="text" id="translater" name="translater" ref="translater" v-model="bibliography.translater">
            </div>
            <div>
                <label for="yearOfPublication">Date de publication <span class="invalidMessage">*</span> :</label>
                <input type="text" id="yearOfPublication" name="yearOfPublication" required ref="yearOfPublication" v-model="bibliography.yearOfPublication">
            </div>
            <div>
                <label for="yearOfReissue">Date de réédition :</label>
                <input type="text" id="yearOfReissue" name="yearOfReissue" ref="yearOfReissue" v-model="bibliography.yearOfReissue">
            </div>
            <div>
                <label for="bibliographyPicture">Aperçu de l'oeuvre <span class="invalidMessage">*</span> :</label>
                <input type="file" id="bibliographyPicture" name="bibliographyPicture" accept="image/*" required ref="bibliographyPicture" @change="onSelect">
            </div>
            <p ref="message">{{message}}</p>
            <p class="requiredFields"><span class="invalidMessage">*</span> Champs obligatoires</p>
            <div class="btn-div">
                <button class="biggerBtn">Publier ma bibliographie</button>
            </div>
        </form>
    </article>
</template>

<style scoped>

</style>

<script>
    import secrets from "../../secrets";

    export default {
        name : "bibliographyPost",

        data(){
            return {
                bibliography : {
                    title : "",
                    auther : "",
                    translater : "",
                    yearOfPublication : "",
                    yearOfReissue : ""
                },

                file : "",

                message : ""
            }
        },

        methods : {
            onSelect(){
                this.file = this.$refs.bibliographyPicture.files[0];
            },

            onSubmit(){
                //création de l'objet bibliography
                let bibliography = {
                    ...this.bibliography,
                    userId : localStorage.userId
                };
                //création du formData qui sera envoyé
                const formData = new FormData();
                formData.append("image", this.file);
                formData.append("bibliography", JSON.stringify(bibliography));
                //options du formulaire
                const options = {
                    headers : {
                        authorization : localStorage.userId + " " + localStorage.token
                    },
                    method : "POST",
                    body : formData
                };
                //envoi du formulaire
                fetch(secrets.fetchPath + "api/bibliography/", options)
                .then(response => {
                    if(response.ok){
                        //message à l'utilisateur et vidage des données
                        this.$refs.message.setAttribute("class", "validMessage")
                        this.message = "Bibliographie créée.";
                        this.bibliography.title = "";
                        this.bibliography.auther = "";
                        this.bibliography.translater = "";
                        this.bibliography.yearOfPublication = "";
                        this.bibliography.yearOfReissue = "";
                        this.file = "";
                    }
                    else{
                        this.$refs.message.setAttribute("class", "invalidMessage")
                        this.message = "La bibliographie n'a pas pu être créée.";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch :" + error.message);
                    this.$refs.message.setAttribute("class", "invalidMessage")
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        }
    };
</script>