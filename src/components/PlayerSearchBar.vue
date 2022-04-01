<template>
  <form @submit.prevent="search()">
    <span class="p-input-icon-right w-full">
      <i
        class="pi pi-search"
        :style="{ 'margin-right': `${size / 2}rem` }"
        @click="search()"
      />
      <InputText
        class="w-full"
        placeholder="플레이어 검색"
        type="text"
        v-model="playerName"
        :style="{ padding: `${size}rem` }"
      />
    </span>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    InputText,
  },
  props: {
    size: Number,
  },
  setup() {
    const router = useRouter();
    const playerName = ref("");
    const search = () => {
      router.push({
        name: "PlayerInformationView",
        params: {
          playerName: playerName.value,
        },
      });
    };
    return {
      playerName,
      search,
    };
  },
});
</script>
