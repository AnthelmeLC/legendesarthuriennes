<template>
    <section class="container">
        <h1>Mentions légales</h1>
        <p>Les textes publiés sur le sites appartiennent à leur auteur.e. Si vous souhaitez utilisez ces textes, envoyez votre demande par notre formulaire de <router-link to="/contact">contact</router-link>.</p>
        <p>Les images et photos publiées sur le sites sont pour la plupart non libres de droits.</p>
        <p>Les icones ont été créées par <a href="https://www.freepik.com" title="Freepik">Freepik</a> du site <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        <p>L'icone de navigation sur mobile a été créée par <a href="https://www.flaticon.com/authors/catalin-fertu" title="Catalin Fertu">Catalin Fertu</a> du site <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        <p>Tous droits réservés © Les chevaliers Pourpres 2020 - Webmaster : Antoine Artus</p>
    </section>
</template>

<style scoped>
    p{
        width: 100%;
    }

    a{
        text-decoration: underline;
    }
</style>

<script>    
    export default {
        name: 'LegalNotice'
    };
</script>