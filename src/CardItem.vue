<script setup lang="ts">
import type { Card } from '@/domain/card'

const props = defineProps<{
     card: Card 
    }>()

const emit = defineEmits(['edit', 'delete'])

function onDragStart(e: DragEvent) {
    e.dataTransfer?.setData('text/plain', props.card.id)
    if(e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
    }
}
</script>

<template>
<v-card 
outlined
elevation="1"
rounded="1g"
class="cursor-move card-item mx-auto"
draggable="true"
@dragstart="onDragStart"
max-width="400"
justify-center
>
    <v-card-title>{{ card.title }}</v-card-title>
    <v-card-text>{{ card.description }}</v-card-text>
    <v-card-actions>
        <v-btn icon="mdi-pencil" @click="emit('edit', card)"></v-btn>
        <v-btn icon="mdi-delete" @click="emit('delete', card.id)"></v-btn>
    </v-card-actions>
</v-card>
</template>

<style scoped>
.card-item {
    margin-bottom: 12px;
    transition: box-shadow 0.2s ease
}

.card-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>