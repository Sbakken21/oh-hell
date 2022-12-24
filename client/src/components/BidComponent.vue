<template>
    <div>
        BID:
        <input-component type="text" v-model="bid" />
        <primary-button @click="$emit('bid', bid)">Bid</primary-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputComponent from './InputComponent.vue';
import PrimaryButton from './PrimaryButton.vue';

export default defineComponent({
    components: { InputComponent, PrimaryButton },
    setup() {
        const bid = ref("");

        return {
            bid
        }
    },
})
</script>
