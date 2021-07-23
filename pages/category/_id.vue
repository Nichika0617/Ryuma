<template>
  <div class="container">
    {{page}}
  </div>
</template>
<script>
import {listProductsByCategoryId} from "@/api/product";
export default {
  data () {
    return {
      categoryQuery: {
          categoryId: this.$route.params.id,
          orderBy: 3,
          page: 1,
          size: 16
      },
      page: {},
    }
  },
  methods: {
    fetchData() {
      listProductsByCategoryId(this.categoryQuery)
        .then((res) => {
          this.page = res.data.page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchData();
  },
}
</script>