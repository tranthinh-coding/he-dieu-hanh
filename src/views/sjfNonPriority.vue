<script setup>
import { ref } from "vue";

import TheGant from "@/components/TheGant.vue";
import TheTimer from "@/components/TheTimer.vue";

const ps = ref([{ p: "P1", timeUse: null, timeSpendding: null, status: false }]);
const timer = ref([]);
const gant = ref([]);
const tavg = ref(0);

function addMoreNumber() {
  ps.value.length = ps.value.length + 1;
  ps.value[ps.value.length - 1] = {
    p: `P${ps.value.length}`,
    timeUse: null,
    timeSpendding: null,
    status: false
  };
}

function getMinByTimeSpendding() {
  let indexMin = ps.value.reduce((prev, curr, currIndex) => {
    if (curr.timeSpendding < prev && !curr.status) {
      return currIndex;
    }
    return prev;
  }, ps.value[0].timeSpendding);
  ps.value[indexMin].status = true;
  return ps.value[indexMin];
}

function resetStatus() {
  ps.value.forEach((e) => e.status = false);
}

function reset() {
  ps.value = [{ p: "P1", timeUse: null, timeSpendding: null, stats: false }];
  tavg.value = 0;
  gant.value = [];
  gant.value = [];
}

function makeTimer() {
  timer.value = gant.value.map((e) => {
    return {
      t: `T${e.p[1]}`,
      spendding: e.start - e.timeSpend,
    };
  });
  timer.value.sort((a, b) => a.t - b.t > 0);
}

function makeAllTimeSpendding() {
  const allTimeSpendding = timer.value.reduce(
    (pre, curr) => pre + curr.spendding,
    0
  );
  tavg.value = allTimeSpendding / timer.value.length || 0;
}

function makeGantTime() {
  let pMinTimeSpendding = getMinByTimeSpendding();

  let time = 0;
  gant.value = [
    {
      p: `${pMinTimeSpendding.p}`,
      start: time,
      end: time + pMinTimeSpendding.timeUse,
      timeSpend: pMinTimeSpendding.timeSpendding
    }
  ];
  time += pMinTimeSpendding.timeUse;

  for (const pi of ps.value) {
    if (!pi.status) {
      gant.value.push({
        p: `${pi.p}`,
        start: time,
        end: time + pi.timeUse,
        timeSpend: pi.timeSpendding
      });
      time += pi.timeUse;
      pi.status = true;
    }
  }
}

function calculator() {
  resetStatus();
  ps.value.sort((a, b) => a.timeUse - b.timeUse);

  makeGantTime();

  console.log({ ps: ps.value, gant: gant.value });

  makeTimer();
  makeAllTimeSpendding();
}

function removeItem(index) {
  ps.value.splice(index, 1);
}
</script>

<template>
  <div class="container text-slate-200">
    <div class="rounded-2xl bg-slate-600 p-4">
      <button
        class="text-slate-200 mr-2 px-16 py-2 bg-blue-600 rounded-xl"
        @click="addMoreNumber"
      >
        Thêm
      </button>
      <button
        class="text-slate-200 ml-2 px-16 py-2 bg-blue-600 rounded-xl"
        @click="reset"
      >
        Reset
      </button>
      <div class="flex mt-5 justify-center gap-10 items-center">
        <p>Time xài</p>
        <p>Time nạp</p>
      </div>
      <div v-for="(p, i) in ps" :key="i">
        <div class="my-2 flex items-center justify-center gap-2">
          <p>{{ p.p }}</p>
          <input
            class="px-2 py-1 text-slate-200 bg-slate-500 rounded"
            type="number"
            v-model="p.timeUse"
          />
          <input
            class="px-2 py-1 text-slate-200 bg-slate-500 rounded"
            type="number"
            v-model="p.timeSpendding"
          />
          <button
            @click="removeItem(i)"
            class="text-slate-50 px-3 py-1 bg-blue-600 rounded-xl"
          >
            X
          </button>
        </div>
      </div>
      <!--  -->
      <div>
        <button
          @click="calculator"
          class="text-slate-50 px-16 py-2 bg-blue-600 rounded-xl"
        >
          Tính
        </button>
      </div>
    </div>

    <the-timer :timer="timer" :tavg="tavg" />

    <the-gant :gant="gant" />
  </div>
</template>
