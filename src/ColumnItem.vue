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