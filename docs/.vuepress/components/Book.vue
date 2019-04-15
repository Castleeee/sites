<template>
  <div id="books"><a :href='getbook()'>{{ name }}</a><br/></div>

</template>

<script>
  export default {
    name: 'Book',
    props: ['path', 'name'],
    mounted: function () {
        this.IpAddr = window.document.location.hostname
    },
    beforeUpdate: function () {
      this.IpAddr = window.document.location.hostname
    },
    data(){
      return{
        IpAddr:'47.101.52.166'
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
