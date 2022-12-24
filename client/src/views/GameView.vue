<template>
    <div>
        <PlayersCard :players="game.players" />
        <h1>Trump Card</h1>
        <div  v-if="game && game.trump && game.trump.suit">
            <CardComponent :card="game.trump" key="trump-card" />
        </div>
        <hr>
        <BidComponent v-show="game && game.phase === 0 && game.activePlayer.id == socket.id" @bid="setBid" />
        <hr>
        Player Data:
        {{ JSON.stringify(player) }}
        <hr>
        Hand:
        <div v-if="player" class="flex flex-wrap justify-center">
            <CardComponent  v-for="card, index in player.hand" :key="`card-${index}`" :card="card" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router';
import CardComponent from '@/components/CardComponent.vue';
import BidComponent from '@/components/BidComponent.vue';
import PlayersCard from '@/components/PlayersCard.vue';

export default defineComponent({
    props: {
        socket: {
            type: Object,
            required: true
        }
    },
    components: {
        CardComponent,
        BidComponent,
        PlayersCard
    },

    setup(props) {
        const router = useRoute();
        let game = ref({
            phase: 0,
            activePlayer: {},
            players: [],
            trump: {}
        });

        let player = ref({
            hand: [],
            name: "",
            score: 0,
            isActive: false,
        });

        const setBid = (bid: number) => {
            props.socket.emit("player.bid", {
                gameId: router.params.id,
                bid: bid,
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
            setBid,
            player,
        }
    },
})
</script>
