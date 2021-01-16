<template>
    <section id="wip" class="container">
        <h1>Cette page est en cours de développement<br>et sera disponible prochainement.</h1>
        <p>Vous trouverez ici {{msg}}</p>
    </section>
</template>

<script>
    export default {
        name : "wip",
        props : ['msg']
    }
</script>

<style scoped>
    h1, p{
        text-align: center;
        margin-top: 10%;
        font-size: 2em;
    }
</style>