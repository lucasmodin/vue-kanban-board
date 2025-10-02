<script setup lang="ts">
import ColumnItem from './ColumnItem.vue'
import { ref } from 'vue'
import { useCreateCard, useDeleteCard, useCardUpdate, useMoveCard } from './composables'
import { useBoardState } from './composables/boardState';
import type { Card, Status } from './domain/card'

const defaultStatus: Status = 'backlog'

const { backlog, doing, review, done } = useBoardState()
const { create } = useCreateCard()
const { remove } = useDeleteCard()
const { update } = useCardUpdate()
const { moveCard } = useMoveCard()

const newTitle = ref('')
const newDescription = ref('')

const editCard = ref<(Card | null)> (null)
const editDialog = ref(false)
const editTitle = ref('')
const editDescription = ref('')

function onCreate() {
  if(!newTitle.value.trim()) {
    return
  }
  create(newTitle.value, newDescription.value, defaultStatus)
  newTitle.value = ''
  newDescription.value = ''
}

function onDelete(id: string) {
  remove(id)
}

function onMove(id: string, status: Status) {
  moveCard(id, status)
}

function onUpdate(card: Card) {
  editCard.value = card
  editTitle.value = card.title
  editDescription.value = card.description
  editDialog.value = true
}

function saveEdit() {
  if (editCard.value) {
    update(editCard.value.id, editTitle.value, editDescription.value)
  }
  editDialog.value = false
}

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Kanban Board</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex align-center justify-center">
        <v-card class="pa-4 mb-6 w-100" max-width="500">
            <v-text-field v-model="newTitle" label="Titel" class="mb3"/>
            <v-textarea v-model="newDescription" label="Beskrivelse" class="mb3"/>
            <v-btn color="primary" @click="onCreate">Tilføj til backlog</v-btn>
        </v-card>
      </v-container>

      <v-row>
        <v-col cols="12" md="3">
          <ColumnItem
          title="Backlog"
          status="backlog"
          :items="backlog"
          @delete="onDelete"
          @move="onMove"
          @edit="onUpdate"
          >
          </ColumnItem>
        </v-col>
        <v-col cols="12" md="3">
          <ColumnItem
          title="Doing"
          status="doing"
          :items="doing"
          @delete="onDelete"
          @move="onMove"
          @edit="onUpdate"
          >
          </ColumnItem>
        </v-col>
        <v-col cols="12" md="3">
          <ColumnItem
          title="Review"
          status="review"
          :items="review"
          @delete="onDelete"
          @move="onMove"
          @edit="onUpdate"
          >
          </ColumnItem>
        </v-col>
        <v-col cols="12" md="3">
          <ColumnItem
          title="Done"
          status="done"
          :items="done"
          @delete="onDelete"
          @move="onMove"
          @edit="onUpdate"
          >
          </ColumnItem>
        </v-col>
      </v-row>
    </v-main>
  </v-app>

  <v-dialog v-model="editDialog" max-width="500">
    <v-card>
      <v-card-title>Rediger kort: {{ newTitle }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="editTitle" label="Titel" ></v-text-field>
        <v-textarea v-model="editDescription" label="Beskrivelse"></v-textarea>
        <v-card-actions>
          <v-btn text @click="editDialog = false">Annuller</v-btn>
          <v-btn color="primary" @click="saveEdit">Gem</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>


</template>

<style scoped></style>
