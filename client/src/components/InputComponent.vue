<template>
    <input 
        class="border border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm outline-none" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        ref="input"
    >
</template>

<script>
    export default {
        props: ['modelValue'],
        emits: ['update:modelValue'],
        methods: {
            focus() {
                this.$refs.input.focus()
            }
        }
    }
</script>
