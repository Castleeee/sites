<template>
  <div id="books"><a :href='getbook()'>{{ name }}</a></div>

</template>

<script>
  export default {
    name: 'Book',
    props: ['path', 'name'],
    mounted: function () {
      this.$nextTick(function () {
        return window.document.location.hostname
      })
    },
    methods: {
      getbook: function () {
        var IpAddr = this.$nextTick
        //console.log(IpAddr + this.path)
        return 'http://'+ IpAddr+ ":8888" + this.path
      }
    }
  }
</script>

<style scoped>

</style>
