<script setup>
import { defineProps } from "vue";
defineProps({
  gant: {
    type: Array,
    require: true,
  },
});
</script>

<template>
  <div class="rounded-2xl text-slate-200 bg-slate-600 p-4 mt-2">
    <div class="w-full border-b border-b-slate-200 flex">
      <div class="flex flex-col items-center justify-end w-4 text-xs h-9">
        <span>
          {{ 0 }}
        </span>
        <span class="text-xs">|</span>
      </div>
      <div v-for="(g, i) in gant" :key="i" class="flex items-start h-9">
        <button class="w-6 h-6 mx-2 text-xs  rounded bg-blue-600">
          {{ g.p }}
        </button>
        <div class="flex flex-col items-center justify-end w-4 text-xs h-full">
          <span>
            {{ g.end }}
          </span>
          <span class="text-xs">|</span>
        </div>
      </div>
    </div>
  </div>
</template>
