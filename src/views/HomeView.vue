<script setup>
import { ref } from "vue";

import TheGant from "@/components/TheGant.vue";
import TheTimer from "@/components/TheTimer.vue";

const ps = ref([{ p: "P1", val: null, pos: 1 }]);
const timer = ref([]);
const gant = ref([]);
const tavg = ref(0);

function addMoreNumber() {
  ps.value.length = ps.value.length + 1;
  ps.value[ps.value.length - 1] = {
    p: `P${ps.value.length}`,
    val: null,
    pos: ps.value.length,
  };
}

function reset() {
  ps.value = [{ p: "P1", val: null, pos: 1 }];
  tavg.value = 0;
  gant.value = [];
  gant.value = [];
}

function calculator() {
  ps.value.sort((a, b) => a.pos - b.pos);
  gant.value = [];
  let time = 0;

  ps.value.forEach((val) => {
    gant.value.push({
      p: `${val.p}`,
      start: time,
      end: time + val.val,
    });
    time += val.val;
  });

  timer.value = gant.value.map((e) => {
    return {
      t: `T${e.p[1]}`,
      spendding: e.start,
    };
  });
  timer.value.sort((a, b) => a.t - b.t);

  const allTimeSpendding = timer.value.reduce(
    (pre, curr) => pre + curr.spendding,
    0
  );
  tavg.value = allTimeSpendding / timer.value.length || 0;
}

function removeItem(index) {
  ps.value.splice(index, 1);
}
//
// [ { value, position }, {  } ]
//
</script>

<template>
  <div class="container text-slate-100">
    <div class="rounded-2xl bg-slate-600 p-4">
      <button
        class="text-slate-100 mr-2 px-16 py-2 bg-blue-600 rounded-xl"
        @click="addMoreNumber"
      >
        Thêm
      </button>
      <button
        class="text-slate-100 ml-2 px-16 py-2 bg-blue-600 rounded-xl"
        @click="reset"
      >
        Reset
      </button>
      <div class="flex justify-center gap-10 items-center mt-5">
        <p>Giá trị</p>
        <p>Thứ tự</p>
      </div>
      <template v-for="(p, i) in ps" :key="i">
        <div class="my-2 flex items-center justify-center gap-2">
          <p>{{ p.p }}</p>
          <input
            class="px-2 bg-slate-500 text-gray-300 py-1 rounded"
            type="number"
            v-model="p.val"
          />
          <input
            class="px-2 bg-slate-500 text-gray-300 py-1 rounded"
            type="number"
            v-model="p.pos"
          />
          <button
            @click="removeItem(i)"
            class="text-slate-100 px-3 py-1 bg-blue-600 rounded-xl"
          >
            X
          </button>
        </div>
      </template>
      <!--  -->
      <div>
        <button
          @click="calculator"
          class="text-slate-100 px-16 py-2 bg-blue-600 rounded-xl"
        >
          Tính
        </button>
      </div>
    </div>

    <the-timer :timer="timer" :tavg="tavg" />

    <the-gant :gant="gant" />
  </div>
</template>
