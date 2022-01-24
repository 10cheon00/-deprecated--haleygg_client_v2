<template>
  <MenuBar class="tabmenu" :model="items">
    <template #start>
      <div class="text-4xl mr-4">Haley.GG</div>
    </template>
    <template #end>
      <div class="p-input-icon-right">
        <i class="pi pi-search"/>
        <InputText placeholder="검색"/>
      </div>
    </template>
  </MenuBar>
</template>

<script>
import { defineComponent, ref } from "vue";
import MenuBar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    MenuBar,
    InputText
  },
  setup() {
    const sideBarVisible = ref(false);
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
          to: "/map/"
        },
      ],
      sideBarVisible,
    };
  },
});
</script>

<style scoped>
</style>