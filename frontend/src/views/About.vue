<template>
    <section class="container">
        <h1>A propos</h1>
        <Wip msg='une page A propos ainsi que certaines références.'></Wip>
    </section>
</template>

<script>
    import Wip from '../components/wip'
    
    export default {
        name: 'About',
        components: {
          Wip
        }
    }
</script>