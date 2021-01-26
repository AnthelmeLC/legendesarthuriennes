<template>
    <section class="container">
        <Wip msg='les lectures qui ont inspiré les recherches des auteurs du site.'></Wip>
    </section>
</template>

<script>
    import Wip from '../components/wip'
    
    export default {
        name: 'Bibliography',
        components: {
          Wip
        }
    }
</script>