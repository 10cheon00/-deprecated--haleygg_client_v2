<template>
  <form @submit.prevent="search()">
    <div class="p-input-icon-right">
      <AutoComplete
        placeholder="플레이어 검색"
        type="text"
        v-model="player"
        field="name"
        :suggestions="filteredPlayerList"
        @complete="findPlayerInList($event)"
      />
      <i class="pi pi-search" @click="search()" />
    </div>
  </form>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AutoComplete from "primevue/autocomplete";

export default defineComponent({
  components: {
    AutoComplete,
  },
  props: {
    size: Number,
  },
  setup() {
    const vuexStore = useStore();
    const router = useRouter();
    const player = ref(null);
    const playerList = computed(() => {
      return vuexStore.getters["playerListStore/getPlayerList"];
    });

    const search = () => {
      if (player.value) {
        router.push({
          name: "PlayerInformationView",
          params: {
            playerName: player.value.name,
          },
        });
      }
    };

    const filteredPlayerList = ref();

    const findPlayerInList = (event) => {
      if (!event.query.trim().length) {
        filteredPlayerList.value = [...playerList.value];
      } else {
        filteredPlayerList.value = playerList.value.filter((player) => {
          return player.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
    };

    return {
      filteredPlayerList,
      player,
      findPlayerInList,
      search,
    };
  },
});
</script>