<template>
    <section id="contact" class="container">
        <h1>Contact</h1>
        <p>N'hésitez pas à me contacter pour tout problème d'accessibilité ou pour toute réclamation.</p>
        <form>
            <div>
                <label for="peuso">Nom Prénom / Pseudo* :</label>
                <input type="text" required name="pseudo" id="pseudo">
            </div>

            <div>
                <label for="topic">Sujet* :</label>
                <input type="text" required name="topic" id="topic">
            </div>

            <div>
                <label for="message">Message* :</label>
                <textarea name="message" id="message" cols="40" rows="10" required></textarea>
            </div>

            <button>Envoyer</button>
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

    button{
        width: 100px;
        height: 50px;
        border-radius: 25%;
        border: none;
        font-family: KingthingsCalligraphicaLight;
        font-size: 1.5em;
        position: absolute;
        right: 0;
        background-color: #2d6ca2;
        color: white;
    }
</style>

<script>
export default {
    name: 'Contact'
}
</script>