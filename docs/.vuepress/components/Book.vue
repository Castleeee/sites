<template>
  <div id="books"><a :href='getbook()'>{{ name }}</a></div>

</template>

<script>
  export default {
    name: 'Book',
    props: ['path', 'name'],
    mounted: function () {
      this.$nextTick(function () {
        this.IpAddr = window.document.location.hostname

      })
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
