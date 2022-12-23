<template>
    <div>
        GAME:
        {{ game }}
        <hr>
        <div v-show="game && game.phase === 0 && game.activePlayer.id == socket.id">
            BID:
            <input type="text" v-model="bid">
            <button @click="setBid">Bid</button>
        </div>
        <hr>
        Player Data:
        {{ JSON.stringify(player) }}
        <hr>
        Hand:
        <div class="flex flex-wrap justify-center">
            <CardComponent  v-for="card, index in player.hand" :key="`card-${index}`" :card="card" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router';
import CardComponent from '@/components/CardComponent.vue';

export default defineComponent({
    props: {
        socket: {
            type: Object,
            required: true
        }
    },
    components: {
        CardComponent
    },

    setup(props) {
        const router = useRoute();
        let game = ref({
            phase: 0,
            activePlayer: {},
            players: [],
        });
        const bid = ref("");
        let player = ref({
            hand: [],
            name: "",
            score: 0,
            isActive: false,
        });

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

            props.socket.on("lobby.join", (response: any) => {
                console.log("RESPONSE:");
                console.log(response);
                game.value = response;
            });

            props.socket.on("player.update", (response: any) => {
                console.log("Updated:");
                player.value = response;
            })

            props.socket.on("player.bid", (response: any) => {
                console.log("NEW BID");
                game.value = response;
                console.log(response);
            });

            props.socket.on("player.round", (data: any) => {
                console.log("Player Data: " + data);
                player.value = data;
            });
        });

        return {
            game,
            bid,
            setBid,
            player,
        }
    },
})
</script>
