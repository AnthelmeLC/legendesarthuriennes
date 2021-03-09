<template>
    <div id="app">
        <navBar></navBar>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<style>
    /*STYLES ET CLASSES GENERAUX*/

    *{
        box-sizing: border-box;
    }

    html, body{
        margin: 0;
        padding: 0;
    }
    
    article{
        margin-right: 5%;
        margin-left: 5%;
        margin-bottom: 5%;
    }

    h1{
        font-family: Tangerine;
        font-size: 4em;
        font-weight: lighter;
        text-decoration: underline;
        text-align: center;
    }

    h2{
        font-family: Charm;
        font-size: 2.5em;
        text-align: center;
        background-color: #2d6ca2;
        color: #ffd700;
    }

    p{
        font-size: 1.5em;
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5%;
    }

    .container{
        max-width: 1500px;
        min-height: 90vh;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 5vh;
        padding-top: 50px;
        padding-bottom: 20px;
        background-color: #fff;
        /*box-shadow: 0px 0px 10px black;*/
    }

    .hidden{
        display: none;
    }

    .invalid{
        border: red solid 3px;
    }

    .invalidMessage{
        color: red;
    }

    .valid{
        border: green solid 3px;
    }

    .validMessage{
        color: green;
    }

    .requiredFields{
        margin: 0;
        margin-bottom: 2%;
        width: 100%;
        font-size: initial;
    }

    #app{
        font-family: Fondamento, Times New Roman, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: black;
        position: relative;
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

    form{
        width: 85%;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        box-shadow: 0px 0px 10px #2d6ca2;
        padding: 10px;
    }

    form div{
        margin-bottom: 5%;
    }

    label{
        display: block;
        font-size: 1.5em;
        margin-bottom: 2%;
    }


    input, textarea{
        width: 100%;
        font-size: 1.5em;
        font-family: Fondamento;
        border: none;
        border-bottom: 1px solid black;
        background-color: #efefef;
        transition: border ease-in-out 200ms;
    }

    input:focus, textarea:focus{
        outline: none;
        border-bottom: 1px solid #ffd700;
    }

    select{
        font-family: Fondamento;
        font-size: 1.5em;
    }

    .btn-div{
        width: 100%;
        text-align: end;
        margin-bottom: 0;
    }
    
    button{
        width: 100px;
        height: 50px;
        border-radius: 5px;
        border: none;
        font-family: Fondamento;
        font-size: 1.2em;
        background-color: #2d6ca2;
        color: white;
        cursor: pointer;
    }

    button:hover{
        background-color: #1F496E;
        transition: all 400ms ease-in-out;
    }

    .biggerBtn{
        width: 150px;
        height: 60px;
    }
</style>

<script>
    import navBar from './components/navBar';
    import Footer from './components/footer';

    export default {
        name: 'App',

        components : {
            navBar,
            Footer
        }
    };
</script>