<template>
  <div id="vcomments"></div>
</template>

<script>
  export default {
    name: 'Valine',
    mounted: function(){
      // require window
      const Valine = require('valine');
      if (typeof window !== 'undefined') {
        this.window = window
        window.AV = require('leancloud-storage')

      }

      new Valine({
        el: '#vcomments' ,
        appId: 'yucMMOBvfxzfWgYnRCMt5YSG-gzGzoHsz',// your appId
        appKey: 'GAChByLl0h8BFVAywTVMMAMy', // your appKey
        notify:false,
        verify:false,
        avatar:'mm',
        placeholder: 'nmsl'
      });
    },
  }
</script>
