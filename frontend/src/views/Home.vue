<template>
    <section id="home" class="container">
        <h1>Découvrez<div id="point1"></div> <div id="point2"></div> <div id="point3"></div></h1>
        <article>
            <h2>Les personnages </h2>
            <figure class="slideshow">
                <img src="../assets/LesDeuxDragons.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/Uther.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/LesDeuxDragons.png" alt="">
            </figure>
        </article>

        <article class="inline">
            <figure class="slideshow">
                <img src="../assets/LesDeuxDragons.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/Uther.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/LesDeuxDragons.png" alt="">
            </figure>
            <h2>Les lieux </h2>
        </article>

        <article class="inline">
            <h2>Les objets </h2>
            <figure class="slideshow">
                <img src="../assets/LesDeuxDragons.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/Uther.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/LesDeuxDragons.png" alt="">
            </figure>
        </article>

        <article class="inline">
            <figure class="slideshow">
                <img src="../assets/LesDeuxDragons.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/Uther.png" alt="">
                <img src="../assets/Merlin.png" alt="">
                <img src="../assets/LesDeuxDragons.png" alt="">
            </figure>
            <h2>Les événements </h2>
        </article>
    </section>
</template>

<style scoped>
    article{
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 5%;
    }

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
        width: 206px;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
    }

    #home .slideshow img{
        pointer-events: none;
        object-fit: contain;
        position: relative;
        animation: 10s animation_slide infinite;
    }

    h1{
        display: flex;
        justify-content: center;
        text-align: center;
    }

    @keyframes points{
        0%{
            transform: scale(0);
            opacity: 0;
        }
        100%{
            transform: scale(1);
            opacity: 1;
        }
    }

    h1 div{
        align-self: flex-end;
        width: 7px;
        height: 7px;
        background-color: black;
        border-radius: 50%;
        margin-left: 1%;
        margin-bottom: 4px;
        animation: points 800ms ease-in-out infinite alternate;
    }

    #point1{
        animation-delay: 100ms;
    }

    #point2{
        animation-delay: 200ms;
    }

    #point3{
        animation-delay: 300ms;
    }
</style>

<script>
export default {
    name: 'Home'
}
</script>