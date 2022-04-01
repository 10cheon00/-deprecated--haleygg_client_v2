<template>
  <div v-if="form">
    <!-- League -->
    <ValidationWrapper class="p-2 pb-0 mb-2" :errorObj="form.errorObj.league">
      <label class="form-label">리그</label>
      <DropDown
        v-model="form.state.league"
        class="w-full"
        :filter="true"
        optionLabel="name"
        optionValue="name"
        :options="resources.leagues"
      />
    </ValidationWrapper>
    <!-- Title -->
    <ValidationWrapper class="m-2" :errorObj="form.errorObj.title">
      <label class="form-label">게임 제목</label>
      <InputText v-model="form.state.title" class="w-full" type="text" />
    </ValidationWrapper>
    <!-- Date -->
    <ValidationWrapper class="m-2" :errorObj="form.errorObj.date">
      <label class="form-label">날짜</label>
      <InputMask
        v-model="form.state.date"
        class="w-full"
        mask="9999-99-99"
        slotChar="yyyy/mm/dd"
      />
    </ValidationWrapper>
    <!-- Map -->
    <ValidationWrapper class="m-2" :errorObj="form.errorObj.map">
      <label class="form-label">맵</label>
      <DropDown
        v-model="form.state.map"
        class="w-full"
        :filter="true"
        optionLabel="name"
        optionValue="name"
        :options="resources.maps"
      />
    </ValidationWrapper>
    <!-- Player tuples -->
    <div
      v-for="(playerTuple, index) in form.state.player_tuples"
      :key="index"
      class="form-player-tuples"
    >
      <ValidationWrapper
        class="m-2"
        :errorObj="form.errorObj.player_tuples.$child[index].winner"
      >
        <label class="form-label">승자</label>
        <DropDown
          v-model="playerTuple.winner"
          class="w-full"
          :filter="true"
          optionLabel="name"
          optionValue="name"
          :options="resources.players"
        />
      </ValidationWrapper>
      <ValidationWrapper
        class="m-2"
        :errorObj="form.errorObj.player_tuples.$child[index].loser"
      >
        <label class="form-label">패자</label>
        <DropDown
          v-model="playerTuple.loser"
          class="w-full"
          optionLabel="name"
          optionValue="name"
          :options="resources.players"
        />
      </ValidationWrapper>
    </div>

    <!-- Miscellaneous -->
    <div class="p-2" id="miscellaneous">
      <label class="form-label">비고</label>
      <InputText
        class="w-full"
        type="text"
        v-model="form.state.miscellaneous"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, toRef } from "vue";
import DropDown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";

import ValidationWrapper from "@/components/ValidationWrapper.vue";

export default defineComponent({
  props: {
    resources: {
      type: Object,
      required: true,
    },
    wrappedForm: {
      type: Object,
      required: true,
    },
  },
  components: {
    DropDown,
    InputMask,
    InputText,
    ValidationWrapper,
  },
  setup(props) {
    const form = toRef(props, "wrappedForm");
    return {
      form,
    };
  },
});
</script>

<style scoped>
.form-header {
  border-bottom: 1px dashed #dee2e6;
  font-weight: bold;
}

.form-label {
  color: gray;
  font-size: smaller;
  font-weight: bold;
  margin-left: 0.5rem;
}

.form-player-tuples {
  border-top: 1px dashed #dee2e6;
}

#miscellaneous {
  border-top: 1px dashed #dee2e6;
}
</style>