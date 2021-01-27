import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Preface from '../views/Preface.vue'
import Story from '../views/Story.vue';
import Bibliography from '../views/Bibliography.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';

Vue.use(VueRouter)

const routes = [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/preface',
        name : 'Preface',
        component : Preface
    },
    {
        path : '/story',
        name : 'Strory',
        component : Story
    },
    {
        path : '/bibliography',
        name : 'Bibliogrpahy',
        component : Bibliography
    },
    {
        path : '/about',
        name : 'About',
        component : About
    },
    {
        path : '/contact',
        name : 'Contact',
        component : Contact
    },
    {
        path : '/login',
        name : 'Login',
        component : Login
    },
    {
        path : '/user',
        name : 'userSpace',
        component : User
    }
]

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
})

export default router
