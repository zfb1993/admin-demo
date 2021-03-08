<template>
  <div class="home">
    <h2>首页</h2>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  mounted() {
      if (sessionStorage.getItem('token') == null){
          this.$router.push({
              path: "login",
          });
      }
  }
}
</script>
