<template>
  <div>
    <button @click="signIn">
      {{ getLoading ? "Loading..." : (getFailed ? "Please refresh!" : "Start Game") }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "LoginPage",
  computed: mapGetters(['getUser', 'getQuests', 'getTeamData', 'getFailed', mapActions]),
  methods: {
    ...mapActions(['login', 'setQuests', 'setTeamData']),
    async signIn() {
      if (!this.getLoading) {
        const redirect = this.$route.query.redirect || '/';
        try {
          const user=await this.login();
          await this.setQuests();
          await this.setTeamData(user.teamId)
          console.log(this.getTeamData)
        } catch (error) {
          console.error('Login failed', error);
        } finally {
          this.$router.push(redirect);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  text-align: center;
  padding: 250px 0;

  button {
    all: unset;
    font-family: 'pressstart2p';
    color: #f4ee80;
    font-size: 3rem;
    text-shadow: 0 5px #a14759;
  }
}
</style>
