<template>
    <section class="container">
        <h1>Votre espace auteur</h1>
        <article>
            <h2>Profil :</h2>
            <p>Ici vous pouvez modifier les informations liées à votre compte à tout moment.</p>

            <div class="mode">
                <button class="biggerBtn" @click="mode = 'modifyPseudo'" v-show="mode != 'modifyPseudo'">Modifier mon pseudo</button>
                <button class="biggerBtn" @click="mode = 'modifyPassword'"  v-show="mode != 'modifyPassword'">Modifier mon mot de passe</button>
            </div>
            
            <pseudoModification v-show="mode === 'modifyPseudo'"></pseudoModification>       
            <passwordModification v-show="mode === 'modifyPassword'"></passwordModification>
        </article>

        <article id="notAdmin" ref="notAdmin" v-if="admin === `false`">
            <h2>Espace auteur.e</h2>

            <div class="mode">
                <button class="biggerBtn" @click="mode = 'newStory'" v-show="mode != 'newStory'">Nouvelle histoire</button>
                <button class="biggerBtn" @click="mode = 'newBibliography'" v-show="mode != 'newBibliography'">Nouvelle bibliographie</button>
            </div>
            
            <storyPost v-show="mode === 'newStory'"></storyPost>
            <bibliographyPost v-show="mode === 'newBibliography'"></bibliographyPost>
        </article>

        <div id="admin" ref="admin" v-if="admin === `true`">
            <div class="mode">
                <button class="biggerBtn" @click="mode = 'usersList'" v-show="mode != 'usersList'">Nouvelle histoire</button>
                <button class="biggerBtn" @click="mode = 'storyTypes'" v-show="mode != 'storyTypes'">Nouvelle bibliographie</button>
            </div>

            <usersList v-show="mode === 'usersList'"></usersList>
            <storyTypes v-show="mode === 'storyTypes'"></storyTypes>
        </div>
    </section>
</template>

<style scoped>
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

    .mode button{
        display: block;
        margin-bottom: 10px;
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
                admin : localStorage.admin,
                mode : ""
            }
        }
    };
</script>