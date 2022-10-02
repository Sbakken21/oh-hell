<template>
    <div>
        GAME:
        {{ game }}
        <hr>
        BID:
        <input type="text" v-model="bid">
        <button @click="setBid">Bid</button>
        <hr>
        HAND:
        {{ hand }}
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router';

export default defineComponent({
    props: {
        socket: {
            type: Object,
            required: true
        }
    },

    setup(props) {
        const router = useRoute();
        let game = ref("");
        const bid = ref("");
        let hand = ref("");

        const setBid = () => {
            props.socket.emit("player.bid", {
                gameId: router.params.id,
                bid: bid.value,
            });
        };

        onMounted(() => {
            props.socket.emit("lobby.join", {
                gameId: router.params.id,
            });

            props.socket.on("lobby.join", (response) => {
                console.log("RESPONSE:");
                console.log(response);
                game.value = response;
            });

            props.socket.on("player.bid", (response) => {
                console.log("NEW BID");
                game.value = response;
                console.log(response);
            });

            props.socket.on("player.round", (data) => {
                console.log(data);
                hand.value = data;
            });
        });

        return {
            game,
            bid,
            setBid,
            hand,
        }
    },
})
</script>
