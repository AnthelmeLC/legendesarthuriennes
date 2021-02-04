<template>
    <article id="wip">
        <h2>Cette page est en cours de développement<br>et sera disponible prochainement.</h2>
        <p>Vous trouverez ici {{msg}}</p>
    </article>
</template>

<style scoped>
    h1, p{
        text-align: center;
        margin-top: 10%;
    }
</style>

<script>
    export default {
        name : "wip",
        props : ['msg']
    };
</script>