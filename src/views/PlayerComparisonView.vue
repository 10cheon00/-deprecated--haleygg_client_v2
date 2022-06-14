<template>
  <div>
    <BasePageHeader>
      <p class="text-4xl m-4 font-bold">상대 전적 검색</p>
    </BasePageHeader>
    <div class="container p-3">
      <!-- Form -->
      <div class="grid grid-nogutter">
        <div class="col-12 md:col-5">
          <FormDataListInputField
            :form="form"
            field="playerName"
            datalist="playerList"
            placeholder="플레이어"
          />
        </div>
        <div
          class="col-12 md:col-2 flex align-items-center justify-content-center"
          id="versus"
        >
          <span>VS</span>
        </div>
        <div class="col-12 md:col-5">
          <FormDataListInputField
            :form="form"
            field="opponentName"
            datalist="playerList"
            placeholder="상대"
          />
        </div>
        <div class="col-12 flex justify-content-center">
          <Button class="flex justify-content-center w-full my-3">
            <span><i class="pi pi-search" /> 검색</span>
          </Button>
        </div>
        <FormDataList
          v-if="playerList"
          :datalist="playerList"
          datalistId="playerList"
        />
      </div>

      <!-- Result -->
      <BasePanel header="검색 결과">
        <div v-if="searchResult"></div>
        <div v-else id="null-data">
          <span>플레이어와 상대를 검색해주세요.</span>
        </div>
      </BasePanel>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import Button from "primevue/button";
import ServerApi from "@/api/server/module.js";

import BasePageHeader from "@/components/BasePageHeader.vue";
import BasePanel from "@/components/BasePanel.vue";
import FormDataList from "@/components/FormDataList.vue";
import FormDataListInputField from "@/components/FormDataListInputField.vue";

export default defineComponent({
  components: {
    BasePageHeader,
    BasePanel,
    Button,
    FormDataList,
    FormDataListInputField,
  },
  setup() {
    const form = reactive({
      playerName: "",
      opponentName: "",
    });
    const playerList = ref(null);
    const searchResult = false;

    console.log(process.env);

    onMounted(async () => {
      const response = await ServerApi.fetchPlayerList();
      playerList.value = response.data;
    });

    return {
      form,
      playerList,
      searchResult,
    };
  },
});
</script>
<style scoped>
#versus {
  min-height: 2rem;
}

#null-data {
  min-height: 20rem;
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>