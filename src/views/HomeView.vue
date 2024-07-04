<template>
  <div class="home">
    <LoginPage v-if="getUser == null" />
    <attendance v-else-if="getUser.role.toUpperCase() === 'ADMIN' && getUser.teamId === 'ADMIN'"></attendance>
    <home-screen v-else></home-screen>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/components/LoginPage.vue'
import { mapGetters } from 'vuex';
import HomeScreen from '../components/Base/HomeScreen.vue'
import Attendance from './AttendanceView.vue';
export default {
  name: 'HomeView',
  components: {
    LoginPage,
    HomeScreen,
    Attendance
  },
  computed: mapGetters(['getUser']),
 
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
