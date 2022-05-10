<script setup>
import { ref } from "vue";

import * as _ from "lodash";

import TheGant from "@/components/TheGant.vue";
import TheTimer from "@/components/TheTimer.vue";

const ps = ref([{ p: "P1", timeUse: null, pos: 1 }]);
const timer = ref([]);
const gant = ref([]);
const tavg = ref(0);

const tq = ref(1);

function addMoreNumber() {
  ps.value.length = ps.value.length + 1;
  ps.value[ps.value.length - 1] = {
    p: `P${ps.value.length}`,
    timeUse: null,
    pos: ps.value.length,
  };
}

function reset() {
  ps.value = [{ p: "P1", timeUse: null, pos: 1 }];
  tavg.value = 0;
  gant.value = [];
  gant.value = [];
  tq.value = 1;
}

function makeTimer() {
  timer.value = gant.value.reduce((prev, curr) => {
    let indexExist = prev.findIndex((el) => el.t == `T${curr.p[1]}`);
    if (indexExist != -1) {
      prev[indexExist].spendding += curr.start - prev[indexExist].end;
      prev[indexExist].end = curr.end;
      return prev;
    }
    return [...prev, {
      t: `T${curr.p[1]}`,
      spendding: curr.start,
      end: curr.end,
    }];
  }, []);
  timer.value.sort((a, b) => a.t - b.t);
}

function calculaTotalTime() {
  const allTimeSpendding = timer.value.reduce(
    (pre, curr) => pre + curr.spendding,
    0
  );
  tavg.value = allTimeSpendding / timer.value.length || 0;
}

function makeGantTime(psclone) {
  gant.value = [];
  let time = 0;
  for (const pi of psclone) {
    let newTimeEnd = pi.timeUse;
    if (pi.timeUse > tq.value) {
      pi.timeUse -= tq.value;
      psclone.push(pi);
      newTimeEnd = tq.value;
    }
    gant.value.push({
      p: `${pi.p}`,
      start: time,
      end: time + newTimeEnd,
    });
    time += newTimeEnd;
  }
}

function calculator() {
  const psclone = _.cloneDeep(ps.value);
  psclone.sort((a, b) => a.pos - b.pos);

  makeGantTime(psclone);
  makeTimer();
  calculaTotalTime();
}

function removeItem(index) {
  ps.value.splice(index, 1);
}
//
// [ { value, position }, {  } ]
//
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
      <div>
        <p>Tq</p>
        <input
            class="px-2 text-slate-200 bg-slate-500 py-1 border border-slate-500 rounded"
            type="number"
            v-model="tq"
          />
      </div>
      <div class="flex justify-center mt-5 gap-10 items-center">
        <p>Giá trị</p>
        <p>Thứ tự</p>
      </div>
      <template v-for="(p, i) in ps" :key="i">
        <div class="my-2 flex items-center justify-center gap-2">
          <p>{{ p.p }}</p>
          <input
            class="px-2 py-1 bg-slate-500 text-slate-200 rounded"
            type="number"
            v-model="p.timeUse"
          />
          <input
            class="px-2 py-1 bg-slate-500 text-slate-200 rounded"
            type="number"
            v-model="p.pos"
          />
          <button
            @click="removeItem(i)"
            class="text-slate-50 px-3 py-1 bg-blue-600 rounded-xl"
          >
            X
          </button>
        </div>
      </template>
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
