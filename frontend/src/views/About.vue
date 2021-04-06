<template>
    <section>
        <h1>À propos</h1>
        <p id="catchPhrase">Ce site est l'annexe arthurienne du site des <a href="http://www.leschevalierspourpres.com/index.php">Chevaliers Pourpres</a>.</p>
        <figure id="groupe">
            <img src="../assets/images/groupe.jpg" alt="">
            <figcaption>Photo des Chevaliers pourpres (2020), prise par Jean-Christophe Chaudron.</figcaption>
        </figure>
        <div class="container">
            <figure>
                <img src="../assets/images/defile.jpg" alt="">
                <figcaption>Photo des Chevaliers Pourpres lors du défilé de la fête multi-époque de Brouage (2017), prise par Laura Stalin.</figcaption>
            </figure>
            <div class="test2">
                <p>Créée en 2002 par Benjamin Vincent, notre association s'attache à l'évocation médiévale de la légende arthurienne. Il s'agit pour nous d'évoquer la vie des chevaliers de la Table Ronde, ce à quoi pourrait ressembler leur univers. Malgré ce cadre issu du merveilleux, notre association s'attache à une certaine crédibilité historique. Si nos armures et équipements sont parfois très différents les uns des autres, de par les époques représentées et leur lieu de provenance, chaque membre de notre association attache une grande importance à la constitution d'un équipement civil et militaire cohérent.</p>
                <p>Nos activités sont très variées, la prestation phare de l’association se porte sur des combats médiévaux, qu’ils soient chorégraphiés ou non lors de tournois (avec des armes mouchetées pour éviter les accidents). L’association dispose aussi d’un grand nombre d’ateliers : démonstration de fabrication de cotte de maille, calligraphie, jeux historiques et merveilleux, contes, frappe de monnaie, fabrication de bougies, filage... et de forge. L’association dispose aussi d’un camp militaire médiéval</p>
                <p>Nous possédons bien sûr tout le nécessaire de campement médiéval : tentes, auvents, cuisine, etc...</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
    section{
        padding-top: 50px;
    }

    #groupe{
        width: 100%;
    }

    #groupe img{
        width: 100%;
    }

    .container{
        display: flex;
        width: 100%;
    }

    .container figure{
        width: 40%;
        height: fit-content;
        align-self: center;
    }

    .container img{
        width : 100%;
    }

    .container div{
        width: 60%;
    }

    figure{
        margin: 0;
    }

    p{
        text-align: justify;
    }

    a{
        text-decoration: underline;
    }

    @media all and (max-width : 900px){
        .container{
            flex-direction: column;
        }

        .container figure{
            width: 95%;
            order: 2;
        }

        .container div{
            width: 95%;
        }
    }
</style>

<script>    
    export default {
        name: 'About'
    };
</script>