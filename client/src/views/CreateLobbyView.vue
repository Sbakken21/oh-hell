<template>
  <div class="create">
    <h1>Create</h1>
    <input type="number" min="2" max="5" v-model="playerLimit" />
    <button type="submit" @click="create">Create</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { io } from "socket.io-client";

export default defineComponent({
  setup() {
    const playerLimit = ref<number>(2);

    const create = () => {
      console.log(`It worked! ${playerLimit.value}`);
      const socket = io("http://localhost:3000");
      console.log(socket);
      /**
       * This will store the lobby data in state,
       * Then it will redirect to allow user to create name
       * After user has name it will create a lobby w/ a specific ID/code
       * Then it will direct to a waiting for players screen
       * Once another play joins it will allow creator to start game
       * It will auto-start when player limit is reached
       */
    };

    return {
      playerLimit,
      create,
    };
  },
});
</script>
