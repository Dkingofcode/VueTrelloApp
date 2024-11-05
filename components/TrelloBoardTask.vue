<!-- <script setup lang="ts">
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











 -->

 <script setup lang="ts">
 import { computed, ref } from 'vue';
 import type { Task, ID } from '~/types';
 import { onKeyStroke, useDateFormat } from "@vueuse/core";
 
 const props = defineProps<{ task: Task }>();
 const emit = defineEmits<{ (e: "delete", payload: ID): void }>();
 
 const focused = ref(false);
 const createdAt = computed(() => useDateFormat(props.task.createdAt, "MMM D, YYYY").value);
 
 onKeyStroke("Backspace", () => {
   if (focused.value) emit("delete", props.task.id);
 });
 </script>
 
 <template>
   <div 
     :title="createdAt"
     class="task p-4 mb-2 rounded-lg shadow-sm max-w-[250px] flex items-start gap-x-2"
     @focus="$event => focused = true"
     @blur="$event => focused = false"
     tabindex="0"
   >
     <DragHandle class="pr-2 pt-1" />
     <span class="task-content">
       {{ task.title }}
       <strong class="date">{{ createdAt }}</strong>
     </span>
   </div>
 </template>
 
 <style scoped>
 .task {
   background: linear-gradient(135deg, #a8e063, #56ab2f); /* Light green gradient */
   color: #333; /* Text color for light mode */
   transition: background 0.3s ease, color 0.3s ease;
 }
 
 /* Dark mode styling */
 .dark .task {
   background: linear-gradient(135deg, #2e7d32, #1b5e20); /* Darker green for dark mode */
   color: #f5f5f5; /* Light text color for dark mode */
 }
 
 /* Styling for the task content */
 .task-content {
   font-size: 14px;
   font-weight: 500;
 }
 
 /* Style for the date */
 .date {
   display: block;
   font-size: 12px;
   color: inherit;
   font-weight: 400;
   opacity: 0.8;
   margin-top: 4px;
 }
 
 /* Focus and hover effects */
 .task:focus,
 .task:focus-visible,
 .task:hover {
   outline: none;
   box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
 }
 
 .sortable-drag .task {
   transform: rotate(5deg);
 }
 
 .sortable-ghost .task {
   position: relative;
 }
 
 .sortable-ghost .task::after {
   content: "";
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(150, 150, 150, 0.3);
   border-radius: 8px;
 }
 </style>
 


















