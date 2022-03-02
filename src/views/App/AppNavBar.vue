<template>
  <MenuBar class="tabmenu" :model="items">
    <template #start>
      <div class="text-4xl mr-4">Haley.GG</div>
    </template>
    <template #end>
      <form @submit.prevent="search()">
        <div class="flex align-items-center">
          <div class="p-input-icon-right">
            <i class="pi pi-search" @click="search()" />
            <InputText
              class="p-inputtext-sm"
              placeholder="검색"
              type="text"
              v-model="playerName"
            />
          </div>
        </div>
      </form>
      <LoginModal />
    </template>
  </MenuBar>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    InputText,
    MenuBar,
  },
  setup() {
    const router = useRouter();
    const search = () => {
      router.push({
        name: "UserInformationView",
        params: {
          playerName: playerName.value,
        },
      });
    };
    const playerName = ref("");

    return {
      items: [
        {
          label: "유저 정보",
          icon: "pi pi-fw pi-users",
          to: "/user/unknown",
        },
        {
          label: "Elo 랭킹",
          icon: "pi pi-fw pi-chart-line",
          to: "/elo-rank/",
        },
        {
          label: "맵별 통계",
          icon: "pi pi-fw pi-eye",
          to: "/map/",
        },
      ],
      playerName,
      search,
    };
  },
});
</script>

<style scoped>
.p-menubar {
  background: linear-gradient(120deg, #fea29a, #fe62d4);
  border: none;
  border-radius: 0px;
}
</style>
