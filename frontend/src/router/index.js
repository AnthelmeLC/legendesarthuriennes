import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Story from '../views/Story.vue';
import Bibliography from '../views/Bibliography.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';
import StoryType from '../views/StoryType.vue';

Vue.use(VueRouter)

const routes = [
    {
        path : '/',
        name : 'Home',
        component : Home,
        meta : {
            title : "La bibliothèque de Merlin"
        }
    },
    {
        path : '/storytype',
        name : 'Storytype',
        component : StoryType,
        meta : {
            title : "La bibliothèque de Merlin"
        }
    },
    {
        path : '/story',
        name : 'Strory',
        component : Story,
        meta : {
            title : "Histoire - La bibliothèque de Merlin"
        }
    },
    {
        path : '/bibliography',
        name : 'Bibliogrpahy',
        component : Bibliography,
        meta : {
            title : "Bibliographie - La bibliothèque de Merlin"
        }
    },
    {
        path : '/about',
        name : 'About',
        component : About,
        meta : {
            title : "À propos - La bibliothèque de Merlin"
        }
    },
    {
        path : '/contact',
        name : 'Contact',
        component : Contact,
        meta : {
            title : "Contact - La bibliothèque de Merlin"
        }
    },
    {
        path : '/login',
        name : 'Login',
        component : Login,
        meta : {
            title : "Connexion - La bibliothèque de Merlin"
        }
    },
    {
        path : '/user',
        name : 'userSpace',
        component : User,
        meta : {
            title : "Espace auteur.e - La bibliothèque de Merlin"
        }
    }
]

const router = new VueRouter({
    //mode : 'history',
    base : process.env.BASE_URL,
    routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
  });

export default router