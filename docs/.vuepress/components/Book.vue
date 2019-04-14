<template>
  <div id="books"><a :href='getbook()'>{{ name }}</a></div>

</template>

<script>
  export default {
    name: 'Book',
    props: ['path', 'name'],
    beforeMount: function () {
        this.IpAddr = window.document.location.hostname
    },
    data(){
      return{
        IpAddr:''
      }
    },
    methods: {
      getbook: function () {

        //console.log(IpAddr + this.path)
        return 'http://'+ this.IpAddr+ ":8888" + this.path
      }
    }
  }
</script>

<style scoped>

</style>
