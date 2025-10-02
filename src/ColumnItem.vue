<script setup lang="ts">
import type { Card, Status } from '@/domain/card'
import CardItem from './CardItem.vue';

const props = defineProps<{
    items: Card[]
    title: string
    status: Status
}>()

const emit = defineEmits(['edit', 'delete', 'move'])

function onDragOver(e: DragEvent) {
    e.preventDefault()
    if(e.dataTransfer) e.dataTransfer.dropEffect = ('move')
}

function onDrop(e: DragEvent) {
    e.preventDefault()
    const cardId = e.dataTransfer?.getData('text/plain')
    if (cardId) {
        emit('move', cardId, props.status)
    }

}
</script>

<template>
    <v-card
    rounded="x1"
    :class="['column-card', status]"
    @dragover="onDragOver"
    @drop="onDrop"   
    >
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <CardItem
            v-for="card in items"
            :key="card.id"
            :card="card"
            @edit="emit('edit', card)"   
            @delete="emit('delete',card.id)"
            ></CardItem>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.column-card.backlog {
    background-color: #f3f4f6;
}

.column-card.doing {
  background-color: #e0e7ff;
}

.column-card.review {
  background-color: #fef9c3;
}

.column-card.done {
  background-color: #dcfce7;
}

.column-card {
    min-height: 80vh;
    max-width: 400px;
    margin: 0 auto;
    padding: 8px;
}
</style>