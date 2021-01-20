<template>
    <section class="container">
        <h1>Votre espace auteur</h1>
        <article>
            <h2>Profil :</h2>
            <form class="profilForm">
                <div>
                    <label for="newPseudo">nouveau pseudo* :</label>
                    <input type="text" id="newPseudo" name="newPseudo" required>
                </div>
                <button>Modifier mon pseudo :</button>
            </form>

            <form class="profilForm">
                <div>
                    <label for="oldPassword">Ancien mot de passe* :</label>
                    <input type="password" id="oldPassword" name="oldPassword" required>
                </div>
                <div>
                    <label for="newPassword">Nouveau mot de passe* :</label>
                    <input type="password" id="newPassword" name="newPassword" required>
                </div>
                <div>
                    <label for="confirmationPassword">Confirmation* :</label>
                    <input type="password" id="confirmationPassword" name="confirmationPassword" required>
                </div>
                <button>Modifier mon mot de passe</button>
            </form>
        </article>

        <article>
            <h2>Nouvelle histoire :</h2>
            <form>
                <div>
                    <label for="storyTitle">Titre* :</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div id="storyDiv">
                    <label for="story">Racontez nous* :</label>
                    <textarea name="story" id="story" cols="30" rows="30" required></textarea>
                </div>
                <div>
                    <label for="storyType">C'est l'histoire d'un :</label>
                    <select name="storyType" id="storyType" required>
                        <option value="Objet">Objet</option>
                        <option value="Lieu">Lieux</option>
                        <option value="Événement">Événement</option>
                        <option value="Personnage">Personnage</option>
                    </select>
                </div>
                <button>Publier mon histoire</button>
            </form>
        </article>

        <article>
            <h2>Nouvelle bibliographie :</h2>
            <form>
                <div>
                    <label for="title">Titre de l'oeuvre* :</label>
                    <input type="text" id="bibliograhyTitle" name="bibliographyTitle" required>
                </div>
                <div>
                    <label for="auther">Auteur* :</label>
                    <input type="text" id="auther" name="auther" required>
                </div>
                <div>
                    <label for="translater">Traducteur :</label>
                    <input type="text" id="translater" name="translater">
                </div>
                <div>
                    <label for="yearOfPublication">Date de publication* :</label>
                    <input type="text" id="yearOfPublication" name="yearOfPublication" required>
                </div>
                <div>
                    <label for="yearOfReissue">Date de réédition :</label>
                    <input type="text" id="yearOfReissue" name="YearOfReissue">
                </div>
                <button>Publier ma bibliographie</button>
            </form>
        </article>
    </section>
</template>

<style scoped>
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
</style>

<script>
    export default {
        name: 'User',
        mounted(){
        
        }
    }
</script>