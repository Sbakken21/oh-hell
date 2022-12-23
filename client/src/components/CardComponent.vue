<template>
    <img :src="retrieveCard()" :alt="`${card.value}-${card.suit}`">
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        card: Object,
    }
})

export default class CardComponent extends Vue {
    card: any;

    retrieveCard() {
        let value;

        switch(this.card.value){
            case 1:
                value = 'ace';
                break;

            case 11:
                value = 'jack';
                break;

            case 12:
                value = 'queen';
                break;

            case 13:
                value = 'king';
                break;

            default:
                value = this.card.value;
        }

        return require(`../assets/svg-cards/${value}_of_${this.card.suit}s.svg`);
    }
}
</script>
