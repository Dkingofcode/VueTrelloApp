<script setup lang="ts">
import {computed} from 'vue';
import type { Task, ID } from '~/types';
import { onKeyStroke, useDateFormat } from "@vueuse/core"


const props = defineProps<{
   task: Task;
}>();

const emit = defineEmits<{
   (e: "delete", payload: ID ): void;
}>();


const focused = ref(false);

const createdAt = computed(() => useDateFormat(props.task.createdAt, "MMM D, YYYY").value);

onKeyStroke("Backspace", (e) => {
    if(focused.value) emit("delete", props.task.id);
});
</script>

<template>
    <div 
      :title="task.createdAt.toLocaleString()"
      class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex items-start gap-x-2"
      @focus="$event => focused = true"
      @blur="$event => focused = false"
      tabindex="0"
      >
        <DragHandle class="pr-2 pt-1"  />
            <span>
              {{ task.title }}
              <strong>{{  createdAt }}</strong>
            </span>
    </div>
</template>
<style>
.sortable-drag .task {
    transform: rotate(5deg);
}

.sortable-ghost .task {
    position: relative;
}

.sortable-ghost .task::after {
    content: "";
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}


.task:focus,
.task:focus-visible {
    @apply outline-gray-400 !important;
    outline: gray auto 1px;
}

</style>












