<template>
  <div id="sidemenu" v-if="getUser != null">
    <button class="sidemenu__btn" v-on:click="navOpen = !navOpen" v-bind:class="{ active: navOpen }">
      <span class="top"></span>
      <span class="mid"></span>
      <span class="bottom"></span>
    </button>
    <transition name="translateX">
      <nav v-show="navOpen">
        <div class="sidemenu__wrapper">
          <ul class="sidemenu__list">
            <li class="sidemenu__item" @click="closeMenu"><router-link to="/">Home</router-link></li>
            <li class="sidemenu__item" @click="closeMenu"> <router-link to="/Battlefield">Explore</router-link></li>
            <li class="sidemenu__item" @click="closeMenu"><router-link to="/QuestCenter">Quest Center</router-link></li>
            <li class="sidemenu__item" @click="closeMenu"><router-link to="/MyQuest">My Quest</router-link></li>
            <li class="sidemenu__item" @click="closeMenu"><router-link to="/QRCode">Attendance</router-link></li>
            <li class="sidemenu__item" @click="closeMenu" v-if="correctTime()"><router-link
                to="/TransferPoints">Transfer Points</router-link></li>
            <!-- <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/AddQuest">Add
                Quest</router-link></li>
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link to="/AddTeam">Add
                Team</router-link></li>
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/AssignPlayers">Assign Players</router-link></li>-->
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/LeaderboardGold">Leaderboard Gold</router-link></li> 
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/LeaderboardHp">Leaderboard HP</router-link></li> 
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/LeaderboardTeams">Leaderboard Teams</router-link></li> 
            <li class="sidemenu__item" @click="closeMenu" v-if="getUser.isAdmin === true"><router-link
                to="/AddPoints">Add Points</router-link></li>

          </ul>
        </div>
      </nav>
    </transition>
  </div>

  <router-view />
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { initialize } from '@/firebase';
const { firebaseApp, firestore, auth } = initialize();
export default {
  data() {
    return {
      navOpen: false,
    }
  }, methods: {
    closeMenu() {
      this.navOpen = false;
    },
    correctTime() {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      return hour === 21 && minutes <= 30 && this.getUser.isTeamLead;
    }
  },
  computed: mapGetters(['getUser',]),
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  background-image: radial-gradient(rgb(168 165 104 / 30%) 1px, transparent 0);
  background-size: 2em 2em;
  background-color: #042226 !important;

  >* {
    color: #FFF;
  }
}

#app {
  height: 100%;
  position: relative;
}

#sidemenu {
  text-align: center;

  nav {
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#A8A568 1px, transparent 0);
    background-size: 2em 2em;
    background-color: #042226 !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1099;
  }

  .sidemenu {
    &__btn {
      display: block;
      width: 50px;
      height: 50px;
      background: transparent;
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1100;
      appearance: none;
      cursor: pointer;
      outline: none;

      span {
        display: block;
        width: 20px;
        height: 2px;
        margin: auto;
        background: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: all .4s ease;

        &.top {
          transform: translateY(-8px);
        }

        &.bottom {
          transform: translateY(8px);
        }
      }

      &.active {
        .top {
          transform: rotate(-45deg);
        }

        .mid {
          transform: translateX(-20px) rotate(360deg);
          opacity: 0;
        }

        .bottom {
          transform: rotate(45deg);
        }
      }

    }

    &__wrapper {
      padding-top: 50px;
    }

    &__list {
      padding-top: 50px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__item {
      a {
        font-family: 'ptmono';
        text-decoration: none;
        line-height: 1.6em;
        font-size: 1.6em;
        padding: .5em;
        display: block;
        color: white;
        transition: .4s ease;

        &:hover {
          font-family: 'pressstart2p';
          color: #f4ee80;
          font-size: 1.5rem;
          text-shadow: 0 3px #a14759;
        }
      }
    }
  }
}

.translateX-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,
.translateX-leave-active {
  transform-origin: top left 0;
  transition: .2s ease;
}

.translateX-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}

// a{
//   font-family: 'ptmono';
// }
a.router-link-active {
  all: unset;
  font-family: 'pressstart2p' !important;
  color: #f4ee80 !important;
  font-size: 1.5rem;
  text-shadow: 0 3px #a14759;
}
</style>
