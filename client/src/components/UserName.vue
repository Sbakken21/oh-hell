<template>
    <div>
        <label>Username:</label>
        <form @submit.prevent="create">
            <input-component type="text" v-model="userName" required autofocus />
            <primary-button type="submit">Create</primary-button>
        </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';
import InputComponent from './InputComponent.vue';
import PrimaryButton from './PrimaryButton.vue';

@Options({
    components: { InputComponent, PrimaryButton },
    props: {
        socket: Object,
        msg: String,
    }
})

export default class UserName extends Vue {
    userName = '';
    msg!: string;
    socket: any;
    router = useRouter();

    create() {
        this.socket.auth = { username: this.userName };
        this.socket.connect();
        return this.router.push({name: 'list'});
    }

    mounted() {
        if(this.socket.connected) {
            console.log(this.socket.auth.username);
            const authUser = this.socket.auth.username;
            if(authUser) {
                this.userName = authUser;
            }
        }
    }
}
</script>