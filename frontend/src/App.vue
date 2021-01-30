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
        font-size: 4em;
        font-weight: lighter;
        text-decoration: underline;
        text-align: center;
    }

    p{
        font-size: 2em;
        width: 75%;
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

    .invalid{
        border: red solid 3px;
    }

    .valid{
        border: green solid 3px;
    }

    #app{
        font-family: KingthingsCalligraphicaLight, Times New Roman, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: black;
        position: relative;
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
            cursor: pointer;
    }

    button:hover{
        background-color: #1F496E;
        transition: all 400ms ease-in-out;
    }

    p img{
        display: inline-block;
        margin-left: 15px;
        cursor: pointer;
    }

    p img:hover{
        scale: 0.9;
        transition: scale() ease-in-out 200ms;
    }

    .moderation{
        display: flex;
        justify-content: space-around;
    }

    .moderation img{
        display: block;
        width: 32px;
        cursor: pointer;
    }

    .moderation img:hover{
        scale: 0.9;
        transition: scale() ease-in-out 200ms;
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