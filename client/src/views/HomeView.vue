<template>
  <div class="home">
    <UserName :socket="socket" />
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
