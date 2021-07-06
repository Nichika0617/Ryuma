<template>
  <div>
     <Nuxt />
     <br><br>
     <el-button type="warning"><nuxt-link to ="/" class="return-button" >Topへ戻る</nuxt-link></el-button>
     <!--このボタン中央に置きたい 6/30-->

  </div>
</template>

<script>

</script>

<style scoped>
.return-button{
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
    text-decoration:none;/*アンダーラインなし */
    margin: 0 auto;
}
</style>