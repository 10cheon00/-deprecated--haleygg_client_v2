<template>
  <BasePanel :header="title">
    <table class="w-full">
      <colgroup>
        <col width="30%" />
        <col width="40%" />
        <col width="30%" />
      </colgroup>
      <tbody>
        <tr v-for="(item, index) in rankSheet" :key="index" class="rank">
          <td>{{ index + 1 }}</td>
          <td>
            <span
              class="player-name"
              @click="routeToPlayerInformation(router, item.name)"
            >
              {{ item.name }}
            </span>
          </td>
          <td>{{ item.value }}{{ unit }}</td>
        </tr>
      </tbody>
    </table>
  </BasePanel>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import BasePanel from "@/components/BasePanel";
import { routeToPlayerInformation } from "@/utils/utils.js";

export default defineComponent({
  props: {
    rankSheet: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: false,
    },
  },
  components: {
    BasePanel,
  },
  setup() {
    const router = useRouter();

    return {
      routeToPlayerInformation,
      router,
    };
  },
});
</script>

<style scoped>
.rank {
  text-align: center;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.75rem;
}

.rank:last-child {
  border-bottom: 0;
}

.rank td {
  padding: 0.25rem 0;
}

.rank .player-name {
  cursor: pointer;
}
</style>