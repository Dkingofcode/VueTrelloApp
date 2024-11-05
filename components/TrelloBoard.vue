<script setup lang="ts">
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
            <DragHandle  />
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
</template>