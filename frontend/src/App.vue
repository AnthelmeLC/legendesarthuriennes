<template>
    <div id="app" :class="{'stylized' : !unstyled, 'unstyled' : unstyled, 'light' : !dark, 'dark' : dark}">
        <navBar></navBar>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<style>
    /*FONTS*/

    /*STYLIZED*/
    .stylized, .stylized input, .stylized textarea, .stylized button, .stylized select{
        font-family: Fondamento, Times New Roman, Avenir, Helvetica, Arial, sans-serif;  
    }

    .stylized h1{
        font-family: Tangerine, 'Open Sans', sans-serif;
    }

    .stylized h2{
        font-family: Charm, Times New Roman, Avenir, Helvetica, Arial, sans-serif;
    }

    /*UNSTYLED*/
    .unstyled, .unstyled input, .unstyled textarea, .unstyled button, .unstyled select{
        font-family: Times New Roman, Avenir, Helvetica, Arial, sans-serif;  
    }

    .unstyled h1{
        font-family: 'Open Sans', sans-serif;
    }

    .unstyled h2{
        font-family: Times New Roman, Avenir, Helvetica, Arial, sans-serif;
    }

    /*THEMES*/

    /*LIGHT*/
    .light{
        background-color: white;
        color: black;
    }

    .light h2{
        background-color: #2d6ca2;
        color: #ffd700;
    }

    .light form{
        box-shadow: 0px 0px 10px #2d6ca2;
    }

    .light input, .light textarea{
        border-bottom: 1px solid black;
        background-color: #efefef;
    }

    .light button{
        background-color: #2d6ca2;
        color: white;
    }

    .light button:hover{
        background-color: #1F496E;
    }

    .light #nav, .light #nav .unfold{
        background-color: #9c2a2a;
    }

    .light #nav a, .light footer a{
        color: #fff;
    }

    .light #nav .back{
        color: black;
        background-color: #fff;
    }

    .light #nav .front{
        background-color: black;
    }

    .light footer{
        background-color: #4F1010;
    }

    .light #home .next, .light #home .prev{
        color: #2d6ca2;
    }

    .light #home .dot{
        background-color: #2d6ca2;
    }

    /*DARK*/
    .dark{
        background-color: #3d3d3d;
        color: white;
    }

    .dark h2{
        background-color: #1f1f1f;
        color: #ffd700;
    }

    .dark form{
        box-shadow: 0px 0px 10px #1d1d1d;
    }

    .dark input, .dark textarea{
        border-bottom: 1px solid white;
        background-color: #1d1d1d;
        color: white;
    }

    .dark button{
        background-color: #1d1d1d;
        color: white;
    }

    .dark button:hover{
        background-color: black;
    }

    .dark #nav, .dark #nav .unfold{
        background-color: #1d1d1d;
    }

    .dark #nav a, .dark footer a{
        color: white;
    }

    .dark #nav .back{
        color: white;
        background-color: black;
    }

    .dark #nav .front{
        background-color: white;
    }

    .dark footer{
        background-color: black;
    }

    .dark #home .next, .dark #home .prev{
        color: white;
    }

    .dark #home .dot{
        background-color: white;
    }

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
        font-size: 4em;
        font-weight: lighter;
        text-decoration: underline;
        text-align: center;
    }

    h2{
        font-size: 2.5em;
        text-align: center;
    }

    p{
        font-size: 1.5em;
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5%;
    }

    a{
        display: inline-block;
        text-decoration: none;
        position: relative;
    }

    a::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        transform: scaleX(0);
        transform-origin: left;
        width: 100%;
        height: 2px;
        background-color: #ffd700;
        transition: transform 400ms ease-out;
    }

    a:hover::after{
        transform: scaleX(1);
    }

    a.router-link-exact-active::after{
        transform: scaleX(1);
    }

    a:visited{
        color: inherit;
    }

    .container{
        max-width: 1500px;
        min-height: 90vh;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 5vh;
        padding-top: 50px;
        padding-bottom: 20px;
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
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
        border: none;
        transition: border ease-in-out 200ms;
    }

    input:focus, textarea:focus{
        outline: none;
        border-bottom: 1px solid #ffd700;
    }

    select{
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
        font-size: 1.2em;
        cursor: pointer;
    }

    button:hover{
        transition: all 400ms ease-in-out;
    }

    .biggerBtn{
        width: 150px;
        height: 60px;
    }
    
    .logo{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    #catchPhrase{
        text-align: center;
    }

    @media all and (max-width : 900px){
        p{
            width: 95%;
        }

        form{
            width: 95%;
        }
    }

    @media all and  (max-width : 700px){
        .logo{
            max-width: 95%;
        }
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
        },

        data(){
            return {
                unstyled : localStorage.unstyled,
                dark : localStorage.dark
            }
        }
    };
</script>