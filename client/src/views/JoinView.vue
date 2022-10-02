<template>
    <div>
        <h1>Join</h1>
        <input type="text" v-model="lobbyId">
        <button @click="join">Join</button>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        socket: {
            type: Object,
            required: true
        }
    },

    setup() {
        const lobbyId = ref("");
        const router = useRouter();

        const join = () => {
            return router.push({name: 'game', params: { id:lobbyId.value }});
        };

        onMounted(() => {
            // props.socket.on('lobby.get', (data) => {
            //     console.log(data);
            // })

        });

        return {
            lobbyId,
            join
        }
    },
})
</script>
