<template>
  <a :href='getbook()'>{{ bookname }}</a>
</template>

<script>
  export default {
    name: 'books',
    props: ['bookpath', 'bookname'],
    methods: {
      getbook: function () {
        var IpAddr = document.location.hostname
        console.log(IpAddr + this.bookpath)
        return 'http://'+ IpAddr+ "8888" + this.bookpath
      }
    }
  }
</script>

<style scoped>

</style>
