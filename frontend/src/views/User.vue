<template>
    <section class="container">
        <h1>Votre espace auteur</h1>
        <article>
            <h2>Profil :</h2>
            <p>Ici vous pouvez modifier les informations liées à votre compte à tout moment.</p>
            
            <pseudoModification></pseudoModification>

            <passwordModification></passwordModification>
        </article>

        <div id="notAdmin" ref="notAdmin" v-if="admin === `false`">
            <storyPost></storyPost>

            <bibliographyPost></bibliographyPost>
        </div>

        <div id="admin" ref="admin" v-if="admin === `true`">
            <usersList></usersList>

            <storyTypes></storyTypes>
        </div>
    </section>
</template>

<style scoped>
    article{
        margin-bottom: 20%;
    }

    form{
        margin-bottom: 10%;
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

        data(){
            return {
                admin : localStorage.admin
            }
        }
    }
</script>