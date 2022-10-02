<template>
    <div>
        <h1>User name</h1>
        <label>Username:</label>
        <input type="text" v-model="userName">
        <button @click="create">Create</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

@Options({
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