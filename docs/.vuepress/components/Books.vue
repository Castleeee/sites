<template>
  <div id="books"><a :href='getbook()'>{{ bookname }}</a></div>

</template>

<script>
  export default {
    name: 'Books',
    props: ['bookpath', 'bookname'],
    methods: {
      getbook: function () {
        var IpAddr = document.location.hostname
        console.log(IpAddr + this.bookpath)
        return 'http://'+ IpAddr+ ":8888" + this.bookpath
      }
    }
  }
</script>

<style scoped>

</style>
