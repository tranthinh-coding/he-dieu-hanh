<script setup>
import { defineProps } from "vue";
defineProps({
  timer: {
    type: Array,
    require: true,
  },
  tavg: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="rounded-2xl text-slate-200 bg-slate-600 p-4 mt-2">
    <div class="flex">
      <div
        v-for="(time, i) in timer"
        :key="i"
        class="flex flex-col w-8 border border-slate-200"
      >
        <div>
          {{ time.t }}
        </div>
        <div>
          {{ time.spendding }}
        </div>
      </div>
    </div>
    <div>t trung bình: {{ tavg }}(s)</div>
  </div>
</template>
