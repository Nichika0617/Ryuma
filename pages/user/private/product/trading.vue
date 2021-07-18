<template>
  <div class="container">
    <!--8,10　購入引取中or売却引取中
    区別は２からもらったstatusっていうParamで判断、その値がsaleならば、売却引取中、purchaseであれば購入引取中
    http://localhost:3000/user/private/product/trading
    -->
    <div style="margin-top:50px">
      <span>a</span>
      <el-divider></el-divider>
      <span>a</span>
      <el-divider></el-divider>
      <span>a</span>
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