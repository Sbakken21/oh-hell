<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <UserName :socket="socket" msg="testing" />
  </div>
</template>

<script>
// @ is an alias to /src
import UserName from '@/components/UserName.vue'

export default {
  name: 'HomeView',
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  components: {
    UserName
  }
}
</script>
