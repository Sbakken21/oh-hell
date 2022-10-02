<template>
  <div>
    <h1>Create</h1>
    <h3>User: {{ socket.auth.username }}</h3>
    <label>Max Players (2-5)</label>
    <input type="number" min="2" max="5" v-model="maxPlayers">
    <button type="button" @click="create">Create</button>
    <hr>
    <h1>Lobby ID: {{ lobbyId }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        socket: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const maxPlayers = ref(2);
        const router = useRouter();
        let lobbyId = ref("");

        const create = () => {
            props.socket.emit("lobby.create", {
                maxPlayers: maxPlayers.value,
            });
        }

        onMounted(() => {
            props.socket.on('client.join', (data) => {
                console.log("HERE");
                console.log(data);
                lobbyId.value = data;

                return router.push({name: 'game', params: { id:lobbyId.value }});
            });
        });

        return {
            maxPlayers,
            lobbyId,
            create
        }
    },

    // mounted(props) {
    //     console.log(props);
    //     props.socket.on('lobby.join', (data) => {
    //         console.log("HERE");
    //         console.log(data);
    //         this.lobbyId = data;
    //     });
    // }
});
</script>