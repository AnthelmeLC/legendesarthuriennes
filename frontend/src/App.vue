<template>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> <!--à modifier avec le logo du site ou un logo temporaire-->
        <a class="expand">
            Personnages
            <div class="hidden">
                <div>Merlin l'enchanteur</div>
            </div>
        </a>
        <a class="expand">
            Lieux
            <div class="hidden">
                <div>test</div>
                <div>test encore</div>
            </div>
        </a>
        <a class="expand">
            Objets
            <div class="hidden">
                <div>test</div>
                <div>test encore</div>
            </div>
        </a>
        <a class="expand">
            Évènements
            <div class="hidden">
                <div>test</div>
                <div>test encore</div>
            </div>
        </a>
        <router-link to="/bibliography">Bibliograhie</router-link>
        <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <router-view/>
    </div>
</template>

<style>
html, body{
    margin: 0;
    padding: 0;
}

*{
    box-sizing: border-box;
}

#app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    position: relative;
}

#nav{
    width: 15%;
    position: fixed;
    top: 0;
    left: 0;
    font-weight: bold;
    font-size: 2em;
    background-color: #efefef;
}

#nav a{
    display: block;
    color: black;
    text-decoration: none;
    margin: 0% auto 5% auto;
    padding-top: 5%;
    position: relative;
}

#nav a::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scaleX(0);
    transform-origin: left;
    width: 100%;
    height: 2px;
    background-color: red;
    transition: transform 400ms ease-out;
}

#nav a:hover::after{
    transform: scaleX(1);
}

#nav a.router-link-exact-active{
    color: #1000e6;
}

.expand{
    position: relative;
}

.expand:hover{
    cursor: pointer;
}

.expand:hover div{
    display: block;
    cursor: pointer;
}

.hidden{
    display: none;
    position: absolute;
    left: 100%;
    top: 0%;
    background-color: #efefef;
    width: 100%;
}

.hidden div{
    margin: 0% auto 5% auto;
    padding-top: 5%;
}

.inline{
    display: flex;
}

.container{
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
    background-color: #efefef;
    padding-top: 1px;
    padding-bottom: 1px;
}
</style>

<script>
export default {

}
</script>