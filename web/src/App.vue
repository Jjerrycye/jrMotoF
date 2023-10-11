<template>
  <div>
    <NavigateVue></NavigateVue>
    <router-view />
  </div>
</template>

<script setup>

import NavigateVue from "./components/Navigate.vue";


</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
