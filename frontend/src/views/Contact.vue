<template>
    <section id="contact" class="container">
        <h1>Contact</h1>
        <p>N'hésitez pas à me contacter pour tout problème d'accessibilité ou pour toute réclamation.</p>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="peuso">Nom Prénom / Pseudo* :</label>
                <input type="text" required name="pseudo" id="pseudo" ref="pseudo" v-model="email.pseudo">
            </div>

            <div>
                <label for="topic">Sujet* :</label>
                <input type="text" required name="topic" id="topic" ref="topic" v-model="email.topic">
            </div>

            <div>
                <label for="message">Message* :</label>
                <textarea name="message" id="message" cols="40" rows="10" required ref="message" v-model="email.message"></textarea>
            </div>

            <button>Envoyer</button>
            <p>{{message}}</p>
        </form>
    </section>
</template>

<style scoped>
    form{
        width: 50%;
        margin-right: auto;
        margin-left: auto;
        position: relative;
    }

    form div{
        display: flex;
        margin-bottom: 5%;
    }

    label{
        display: block;
        font-size: 2em;
    }

    input, textarea{
        display: block;
        margin-left: 5%;
    }

    textarea{
        max-width: 85%;
    }
</style>

<script>
    export default {
        name: 'Contact',

        data(){
            return {
                email : {
                    pseudo : "",
                    topic : "",
                    message : ""
                },

                message : ""
            }
        },

        methods : {
            onSubmit(){
                const mail = {
                    pseudo : this.email.pseudo,
                    topic : this.email.topic,
                    message : this.email.message
                };
                //options de la requête
                const options = {
                    headers : {
                        "Content-type" : "application/json"
                    },
                    method : "post",
                    body : JSON.stringify({
                        pseudo : mail.pseudo,
                        topic : mail.topic,
                        message : mail.message
                    })
                };
                console.log(options);
                //envoi du formulaire
                fetch("http://localhost:3000/api/mail/", options)
                .then(response => {
                    if(response.ok){
                        this.message = "email envoyé";
                        this.email.pseudo = "";
                        this.email.topic = "";
                        this.email.message = "";
                    }
                    else{
                        this.message = "email non envoyé";
                    }
                })
                .catch(error => {
                    console.log("Il y a eu un problème avec l'opération fetch : " + error);
                    this.message = "Il y a eu un problème avec l'opération fetch";
                });
            }
        }
    }
</script>