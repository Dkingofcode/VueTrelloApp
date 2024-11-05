<!-- <script setup lang="ts">
import TrelloBoardTask from './TrelloBoardTask.vue';
import type { Column, Task } from '~/types';
import { nanoid } from 'nanoid';
import draggable from "vuedraggable";
//import { VueDraggableNext as draggable } from 'vue-draggable-next';
import NewTask from './NewTask.vue';
import { useLocalStorage, useKeyModifier } from "@vueuse/core"




const columns = useLocalStorage<Column[]>("trelloBoard",[
   
{
    title: "Backlog",
    id: nanoid(),
    tasks: [
        {
            title: "Create marketing landing page",
            createdAt: new Date(),
            id: nanoid(),
        },
        {
            title: "Develop cool new feature",
            createdAt: new Date(),
            id: nanoid(),
        },
        { title: "Fix page nav bug", createdAt: new Date(), id: nanoid() },
    ],
},
{ title: 'Selected for Dev', id: nanoid(), tasks: [] },
{ title: 'In Progress', id: nanoid(), tasks: [] },
{ title: 'QA', id: nanoid(), tasks: [] },
{ title: 'Complete', id: nanoid(), tasks: [] },


],  
{
    serializer: {
        read: (value) => {
            return JSON.parse(value).map((column: Column) => {
               column.tasks = column.tasks.map((task: Task) => {
                 task.createdAt = new Date(task.createdAt);
                 return task;
               });
               return column; 
            });
        },
        write: (value) => JSON.stringify(value),
    },
}
);

const alt = useKeyModifier("Alt");

watch(
    columns, () => {

    },
    {
        deep: true,
    }
)


function createColumn() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: [],
    };
    columns.value.push(column);
    nextTick(() => {
     const newColumnInput = document.querySelector(".column:last-of-type .title-input") as HTMLInputElement;
       if (newColumnInput) {
         newColumnInput.focus();
       }
    });
}

// export default{
//   components: draggable;    
// }

</script>

<template>
  <div class="flex items-start">
    <draggable
    v-model="columns"
    :animations="150"
 
    group="columns"
    item-key="id"
    class="flex gap-4 overflow-x-auto items-start">

<template #item="{ element: column }: { element: Column }">
  <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
        <header class="font-bold mb-4">
            < <DragHandle  /> ->
            <input 
               class="bg-transparent focus:bg-white rounded px-1 w-4/5" 
               @keyup.enter="($event.target as HTMLInputElement).blur()"
               @keydown.backspace="column.title === '' ? columns = columns.filter( c => c.id !== column.id) : null"
               type="text"
               v-model="column.title"
            />  
        </header>
        <draggable
           v-model="column.tasks"
           :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
           :animation="150"
           handle=".drag-handle"
           item-key="id">

           <template #item="{element: task} : {element: Task}">
               <TrelloBoardTask 
               :task="task" 
               @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"
                />
           </template>
        </draggable>

        <footer>
            <NewTask @add="column.tasks.push($event)"  />
        </footer>
    </div>
   </template>
    </draggable>
    <button @click="createColumn" class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50">
        + Add Another Column
    </button>
    </div>
</template> -->





<script setup lang="ts">
import TrelloBoardTask from './TrelloBoardTask.vue';
import type { Column, Task } from '~/types';
import { nanoid } from 'nanoid';
import draggable from "vuedraggable";
import NewTask from './NewTask.vue';
import { useLocalStorage, useKeyModifier } from "@vueuse/core";
import { ref, computed, watch, nextTick } from 'vue';

const isDarkMode = ref(false); // Theme state

const columns = useLocalStorage<Column[]>("trelloBoard", [
  {
    title: "Backlog",
    id: nanoid(),
    tasks: [
      { title: "Create marketing landing page", createdAt: new Date(), id: nanoid() },
      { title: "Develop cool new feature", createdAt: new Date(), id: nanoid() },
      { title: "Fix page nav bug", createdAt: new Date(), id: nanoid() },
    ],
  },
  { title: 'Selected for Dev', id: nanoid(), tasks: [] },
  { title: 'In Progress', id: nanoid(), tasks: [] },
  { title: 'QA', id: nanoid(), tasks: [] },
  { title: 'Complete', id: nanoid(), tasks: [] },
]);

const alt = useKeyModifier("Alt");

watch(columns, () => {}, { deep: true });

function createColumn() {
  const column: Column = { id: nanoid(), title: "", tasks: [] };
  columns.value.push(column);
  nextTick(() => {
    const newColumnInput = document.querySelector(".column:last-of-type .title-input") as HTMLInputElement;
    if (newColumnInput) {
      newColumnInput.focus();
    }
  });
}

function deleteColumn(columnId: string) {
  // Use the splice method to directly modify the array
  const index = columns.value.findIndex(column => column.id === columnId);
  if (index !== -1) {
    columns.value.splice(index, 1);  // Remove the column by index
  }
  console.log("delete Column", columns.value);
}

// Computed class for theme
const themeClass = computed(() => (isDarkMode.value ? 'dark' : 'light'));
</script>

<template>
  <div :class="['app-container', themeClass]">
    <div class="toggle-container">
      <button @click="isDarkMode = !isDarkMode" class="toggle-button">
        {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
      </button>
    </div>
    
    <div class="flex items-start">
      <draggable
        v-model="columns"
        :animations="150"
        group="columns"
        item-key="id"
        class="flex gap-4 overflow-x-auto items-start"
      >
        <template #item="{ element: column }: { element: Column }">
          <div class="column bg-gray-200 p-5 rounded relative min-w-[250px]">
            <!-- Delete Icon -->
              <button @click="deleteColumn(column.id)" class="absolute top-2 right-2">
                <!-- SVG Delete Icon -->
                <svg height="20" width="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#888">
              <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
            </svg>
            </button>

            <!-- Column Header with Editable Title -->
            <header class="font-bold mb-4">
              <input
                class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                @keydown.backspace="column.title === '' ? columns = columns.filter(c => c.id !== column.id) : null"
                type="text"
                v-model="column.title"
              />
            </header>

            <!-- Task Draggable List -->
            <draggable
              v-model="column.tasks"
              :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
              :animation="150"
              handle=".drag-handle"
              item-key="id"
            >
              <template #item="{ element: task } : { element: Task }">
                <TrelloBoardTask :task="task" @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)" />
              </template>
            </draggable>

            <!-- New Task Component -->
            <footer>
              <NewTask @add="column.tasks.push($event)" />
            </footer>
          </div>
        </template>
      </draggable>
      <button @click="createColumn" class="add-column-button bg-gray-200 whitespace-nowrap p-2 rounded opacity-50">
        + Add Another Column
    </button>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 20px;
}

.light {
  background: linear-gradient(to right, #a8e063, #56ab2f);
  color: #333;
}

.dark {
  background-color: #1f1f1f;
  color: #f5f5f5;
}

.column {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 250px;
  padding: 16px;
}

.light .column {
  background-color: #f9f9f9;
}

.dark .column {
  background-color: #333;
  color: #f5f5f5;
}

.toggle-container {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
}

.toggle-button {
  background: none;
  border: 1px solid currentColor;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-button:hover {
  background: rgba(0, 0, 0, 0.1);
}

.title-input{
    color: black;
    text: black;
}

.add-column-button {
  background-color: #ddd;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.add-column-button:hover {
  background-color: #ccc;
}

.add-column-button {
   background: linear-gradient(135deg, #a8e063, #56ab2f); /* Light green gradient */
   color: #333; /* Text color for light mode */
   transition: background 0.3s ease, color 0.3s ease;
 }
 
 /* Dark mode styling */
 .dark .add-column-button {
   background: linear-gradient(135deg, #2e7d32, #1b5e20); /* Darker green for dark mode */
   color: #f5f5f5; /* Light text color for dark mode */
 }
 


</style>
