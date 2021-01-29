<template>
    <section class="container">
        <h1>Votre espace auteur</h1>
        <article>
            <h2>Profil :</h2>
            
            <pseudoModification></pseudoModification>

            <passwordModification></passwordModification>
        </article>

        <div id="notAdmin" ref="notAdmin">
            <storyPost></storyPost>

            <bibliographyPost></bibliographyPost>
        </div>

        <div id="admin" ref="admin">
            <usersList></usersList>

            <storyTypes></storyTypes>
        </div>
    </section>
</template>

<style>
    article{
        margin-bottom: 20%;
    }

    h2{
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        font-size: 3em;
    }

    form{
        width: 80%;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        margin-bottom: 10%;
    }

    form div{
        display: flex;
        margin-bottom: 5%;
    }

    label{
        display: block;
        font-size: 2em;
    }

    input, textarea, select{
        display: block;
        margin-left: 5%;
    }

    textarea{
        max-width: 85%;
    }

    select{
        font-family: KingthingsCalligraphicaLight;
        font-size: 2em;
    }

    button{
        width: 150px;
        height: 60px;
    }

    .profilForm{
        width: 50%;
    }

    #storyDiv{
        flex-direction: column;
    }

    #storyPicture, #bibliographyPicture{
        padding-top: 6px;
        font-family: KingthingsCalligraphicaLight;
        font-size: 1em;
    }
</style>

<script>
    import pseudoModification from '../components/pseudoModification';
    import passwordModification from '../components/passwordModification';
    import storyPost from '../components/storyPost';
    import bibliographyPost from '../components/bibliographyPost';
    import usersList from '../components/usersList';
    import storyTypes from '../components/storyTypes';

    export default {
        name: 'User',

        components : {
            pseudoModification,
            passwordModification,
            storyPost,
            bibliographyPost,
            usersList,
            storyTypes
        },

        mounted(){
            //si l'utilisateur n'est pas l'admin, on cache la partie admin
            if(localStorage.admin != "true"){
                this.$refs.admin.setAttribute("class", "hidden");
            }
            //si l'utilisateur est l'admin
            else{
                //on cache la partie auteur
                this.$refs.notAdmin.setAttribute("class", "hidden");
            }
        }
    }
</script>