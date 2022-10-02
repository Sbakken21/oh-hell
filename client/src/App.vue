<template>
<div>  
  <app-layout>
    <router-view :socket="socket" />
  </app-layout>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { io } from "socket.io-client";
import AppLayout from "./layouts/AppLayout.vue";

export default defineComponent({
    components: { AppLayout },
  setup() {
    const socket = io("http://localhost:8082", { autoConnect: false });

    return {
      socket,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
