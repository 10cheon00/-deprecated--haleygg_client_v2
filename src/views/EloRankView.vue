<template>
  <div>
    <!-- Explanation -->
    <div class="p-8 text-white" id="header">
      <p>Elo 산출 방식은 위키백과와 같습니다.</p>
      <br />
      <p class="text-xl font-bold">After = Before + K * (W - R)</p>
      <br />
      <div class="text-300">
        <p>- K(가중치) = 32</p>
        <p>- W(승리 여부) = 승리 시 1, 무승부 시 0.5, 패배 시 0</p>
        <p>- R = 본인의 승률값</p>
      </div>
    </div>

    <div v-if="eloList" class="p-3" >
      <StripePanel header="ELO Rank">

        <!-- Elo rank table -->
        <table class="p-3" id="elo-rank-table">
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="10%" />
            <col width="60%" />
          </colgroup>
          <thead>
            <tr>
              <th>순위</th>
              <th>유저</th>
              <th>종족</th>
              <th>Elo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in eloList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ row.user.name }}</td>
              <td>{{ row.user.favorate_race }}</td>
              <td class="pr-1">
                <PercentageBar id="eloBar" :data="row" />
              </td>
            </tr>
          </tbody>
        </table>
      </StripePanel>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

import PercentageBar from "@/components/PercentageBar.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    PercentageBar,
    StripePanel,
  },
  setup() {
    const eloList = ref(null);

    onMounted(() => {
      // fetch elo list.
      eloList.value = [
        { user: { name: "asdf", favorate_race: "T" }, elo: 990 },
        { user: { name: "asdf", favorate_race: "Z" }, elo: 701 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 922 },
        { user: { name: "asdf", favorate_race: "P" }, elo: 803 },
        { user: { name: "asdf", favorate_race: "Z" }, elo: 810 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 900 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 766 },
        { user: { name: "asdf", favorate_race: "P" }, elo: 807 },
        { user: { name: "asdf", favorate_race: "P" }, elo: 958 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 909 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 1042 },
        { user: { name: "asdf", favorate_race: "Z" }, elo: 1135 },
        { user: { name: "asdf", favorate_race: "P" }, elo: 1006 },
        { user: { name: "asdf", favorate_race: "T" }, elo: 1027 },
        { user: { name: "asdf", favorate_race: "Z" }, elo: 1018 },
      ];

      eloList.value.sort((a, b) => {
        return b.elo - a.elo;
      });

      const colorCodeStart = [0, 6, 36];
      const colorCodeEnd = [74, 201, 227];

      eloList.value.forEach((value, index, array) => {
        value.value = value.elo;
        value.percentage = value.elo / array[0].elo;
        value.color = [
          Math.floor(colorCodeStart[0] + value.percentage * (colorCodeEnd[0] - colorCodeStart[0])),
          Math.floor(colorCodeStart[1] + value.percentage * (colorCodeEnd[1] - colorCodeStart[1])),
          Math.floor(colorCodeStart[2] + value.percentage * (colorCodeEnd[2] - colorCodeStart[2]))
        ]
      });
    });

    return {
      eloList
    };
  },
});
</script>

<style scoped>
#header {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url('https://i.imgur.com/SK3Kyyf.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 194px;
}

#elo-rank-table {
  text-align: center;
  width: 100%;
}

td,
th {
  border-collapse: collapse;
  border: 1px solid #dee2e6;
  border-right: none;
  border-left: none;
  vertical-align: middle;
}

th {
  background-color: #c8c8c8;
  border-top: none;
  height: 3rem;
  font-weight: bold;
  vertical-align: middle;
}

td {
  height: 2rem;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tbody tr:first-child td {
  border-top: none;
}
</style>