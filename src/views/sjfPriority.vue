<script setup>
import { ref } from "vue";
import _ from "lodash";

import TheGant from "@/components/TheGant.vue";
import TheTimer from "@/components/TheTimer.vue";

const ps = ref([]);
const timer = ref([]);
const gant = ref([]);
const tavg = ref(0);

reset();

function addMoreNumber() {
  ps.value.length = ps.value.length + 1;
  ps.value[ps.value.length - 1] = {
    p: `P${ps.value.length}`,
    timeUse: null,
    timeSpendding: null,
    status: false,
  };
}

function reset() {
  ps.value = [{ 
    p: "P1", 
    timeUse: null, 
    timeSpendding: null, 
    status: false,
  }];
  tavg.value = 0;
  gant.value = [];
  timer.value = [];
}

function resetStatus() {
  ps.value.forEach((e) => (e.status = false));
}

function makeTimer() {
  const diffrentTime = gant.value.reduce((result, current) => {
    let tExist = result.findIndex((e) => e.p == current.p);

    if (tExist != -1) {
      result.splice(tExist, 1);
    }
    result.push(_.cloneDeep(current));
    return result;
  }, []);

  console.log({ diffrentTime });

  timer.value = diffrentTime.map((e) => {
    const pi = ps.value.find(p => p.p == e.p);
    return {
      t: `T${e.p[1]}`,
      spendding: e.end - pi.timeUse - pi.timeSpendding
    }
  })

  timer.value.sort((a, b) => a.t - b.t);
}

function makeAllTimeSpendding() {
  const allTimeSpendding = timer.value.reduce(
    (pre, curr) => pre + curr.spendding,
    0
  );
  tavg.value = allTimeSpendding / timer.value.length || 0;
}

// lay ra pi da san sang chay va thoi gian thuc thi nho nhat
function getPiCanRunAndTimeUseMin(psFake, time, currentP) {
  function check(curr, time, prev) {
    return !curr.status &&
      curr.timeSpendding <= time &&
      curr.timeSpendding == 0 &&
      curr.timeUse<prev.timeUse ||
      prev.status && !curr.status;
  }
  // let minP = currentP;
  let minP = psFake.reduce((prev, curr) => {
    if (check(curr, time, prev))
      return curr;    
    return prev;
  }, currentP);
  // for (const pi of psFake) {
  //   if (
  //     !pi.status && 
  //     pi.timeSpendding <= time && 
  //     pi.timeSpendding == 0 && 
  //     pi.timeUse < minP.timeUse ||
  //     minP.status && !pi.status
  //   ) {
  //     minP = pi;
  //   }
  // }
  if (minP.status) return false;
  return minP; 
}

function makeGantTime(psFake) {
  let time = 0;
  gant.value = [];
  let currRun = psFake[0];

  let t = true;
  while (t) {
    const pCanRun = getPiCanRunAndTimeUseMin(psFake, time, currRun);
    // console.log(pCanRun, currRun);
    if (pCanRun == false) break;
    
    if (pCanRun.p == currRun.p && gant.value.length != 0) {
      gant.value[gant.value.length - 1].end += 1;
    } else {
      gant.value.push({
        p: pCanRun.p,
        end: time + 1
      });
      currRun = pCanRun;
    }    
    --currRun.timeUse;
    if (currRun.timeUse == 0) currRun.status = true; // done Pi
    descrementTimeP();
    ++time;
  }

  // giam thoi gian doi cua tat ca
  function descrementTimeP() {
    psFake.forEach((e) => {
      if (e.timeSpendding > 0)
        --e.timeSpendding;
    })
  }
}

function calculator() {
  resetStatus();
  
  const psFake = _.cloneDeep(ps.value);

  psFake.sort((a, b) => a.timeSpendding - b.timeSpendding);

  makeGantTime(psFake);

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
