<template>
  <div class="container">
    <!--8,10　購入引取中or売却引取中
    区別は２からもらったstatusっていうParamで判断、その値がsaleならば、売却引取中、purchaseであれば購入引取中
    http://localhost:3000/user/private/product/trading
    -->
    <div style="margin-top:50px">
      <span>購入希望1</span>
      <el-divider></el-divider>
      <span>購入希望2</span>
      <el-divider></el-divider>
      <span>売却中1</span>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  head(){
    return {
      title: '取引中一覧',
      }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>