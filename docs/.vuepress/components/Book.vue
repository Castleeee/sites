<template>
  <div id="books"><a :href='getbook()'>{{ name }}</a></div>

</template>

<script>
  export default {
    name: 'Book',
    props: ['path', 'name'],
    methods: {
      getbook: function () {
        var IpAddr = '47.101.52.166'
        //console.log(IpAddr + this.path)
        return 'http://'+ IpAddr+ ":8888" + this.path
      }
    }
  }
</script>

<style scoped>

</style>
