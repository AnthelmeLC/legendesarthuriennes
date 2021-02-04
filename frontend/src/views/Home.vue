<template>
    <section id="home" class="container">
        <h1>La bibliothèque de Merlin</h1>
        <p>Vous invite à découvrir les légendes arthuriennes au travers de récits résumés et accessibles à tous.</p>
        <figure class="slideshow">
            <img src="../assets/LesDeuxDragons.png" alt="">
            <img src="../assets/Merlin.png" alt="">
            <img src="../assets/Uther.png" alt="">
            <img src="../assets/Merlin.png" alt="">
            <img src="../assets/LesDeuxDragons.png" alt="">
        </figure>
    </section>
</template>

<style scoped>
    img{
        width: 100%;
    }

    @keyframes animation_slide{
        0%{left: 0;}
        20%{left: 0;}

        25%{left: -100%;}
        45%{left: -100%;}

        50%{left: -200%;}
        70%{left: -200%;}

        75%{left: -300%;}
        95%{left: -300%;}

        100%{left: -400%;}
    }

    #home .slideshow{
        width: 332px;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        margin-right: auto;
        margin-left: auto;
    }

    #home .slideshow img{
        pointer-events: none;
        object-fit: contain;
        position: relative;
        animation: 20s animation_slide infinite;
    }
</style>

<script>
    export default {
        name: 'Home'
    };
</script>