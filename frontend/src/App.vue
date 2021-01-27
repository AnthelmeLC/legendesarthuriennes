<template>
    <div id="app">
        <navBar></navBar>
        <router-view/>
    </div>
</template>

<style>
/*STYLES ET CLASSES GENERAUX*/
@font-face{
    font-family: "Mirella Script";
    src:url(./assets/mirellascript.ttf) format("truetype");
}

@font-face{
    font-family: "KingthingsCalligraphicaLight";
    src:url(./assets/kingthingscalligraphicalight.ttf) format("truetype");
}

@font-face{
    font-family: "GothicUltra";
    src:url(./assets/gothicultra.ttf) format("truetype");
}

*{
    box-sizing: border-box;
}

html, body{
    margin: 0;
    padding: 0;
    background-color: #cc9a46;
}

h1{
    font-family: Mirella Script;
    font-size: 3em;
    text-decoration: underline;
    text-align: center;
}

p{
    font-size: x-large;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
}

.container{
    max-width: 1000px;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    padding-top: 1px;
    padding-bottom: 20px;
    background-color: #efefef;
}

.hidden{
    display: none;
}

/*STYLES APP ET NAV*/
#app{
    font-family: KingthingsCalligraphicaLight, Times New Roman, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    position: relative;
}

#nav{
    font-family: GothicUltra;
    width: 10%;
    position: fixed;
    top: 0;
    left: 0;
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
    padding-left: 10px;
}

#nav a::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scaleX(0);
    transform-origin: left;
    width: 95%;
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

#nav .hidden{
    position: absolute;
    left: 100%;
    top: 0%;
    background-color: #efefef;
    width: 100%;
}

#nav .hidden div{
    margin: 0% auto 5% auto;
    padding-top: 5%;
}
</style>

<script>
    import navBar from './components/navBar';

    export default {
        name: 'App',

        components : {
            navBar
        }
    }
</script>