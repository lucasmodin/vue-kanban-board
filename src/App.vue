<script setup lang="ts">
import ColumnItem from './ColumnItem.vue'
import { ref, computed } from 'vue'
import { useCreateCard, useDeleteCard, useCardUpdate, useMoveCard } from './composables'
import { useBoardState } from './composables/boardState';
import type { Card, Status } from './domain/card'

const { backlog, doing, review, done } = useBoardState()
const { create } = useCreateCard()
const { remove } = useDeleteCard()
const { update } = useCardUpdate()
const { moveCard } = useMoveCard()
const defaultStatus: Status = 'backlog'

const newTitle = ref('')
const newDescription = ref('')

const editCard = ref<(Card | null)> (null)
const editDialog = ref(false)
const editTitle = ref('')
const editDescription = ref('')

const newTitleError = computed(() => newTitle.value.trim().length ? '' : 'Titel er påkrævet')
const newDescLen   = computed(() => newDescription.value.trim().length)
const newDescError = computed(() => newDescLen.value <= 200 ? '' : 'Maks 200 tegn')
const canCreate    = computed(() => !newTitleError.value && !newDescError.value)

const editTitleError = computed(() => editTitle.value.trim().length ? '' : 'Titel er påkrævet')
const editDescLen    = computed(() => editDescription.value.trim().length)
const editDescError  = computed(() => editDescLen.value <= 200 ? '' : 'Maks 200 tegn')
const canEdit        = computed(() => !editTitleError.value && !editDescError.value)


function onCreate() {
  if(!canCreate.value) {
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
 if (!canEdit.value || !editCard.value) {
  return
 }
  update(editCard.value.id, editTitle.value, editDescription.value)
  editDialog.value = false
}

</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-title class="text-white">Kanban Board</v-app-bar-title>
    </v-app-bar>

    <v-main class="board-bg">
      <v-container class="d-flex align-center justify-center pt-8">
        <v-card class="glass-card w-100" max-width="500">
          <v-card-title>Tilføj kort til board</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field 
              variant="filled" 
              v-model="newTitle" 
              label="Titel" 
              class="mb-3"
              :error="!!newTitleError"
              :error-messages="newTitleError ? [newTitleError] : []"
              />
              <v-textarea 
              variant="filled" 
              v-model="newDescription" 
              label="Beskrivelse" 
              class="mb-3"
              :error="!!newDescError"
              :error-messages="newDescError ? [newDescError] : []"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!canCreate" variant="flat" color="primary" block @click="onCreate">Tilføj til backlog</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>

      <v-divider class="my-8"></v-divider>

      <v-row class="g-4">
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
      <v-card-title>Rediger kort: {{ editTitle }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
          v-model="editTitle" 
          label="Titel" 
          class="mb-3"
          :error="!!editTitleError"
          :error-messages="editTitleError ? [editTitleError] : []"
          />
          <v-textarea 
          v-model="editDescription" 
          label="Beskrivelse" 
          class="mb-3"
          :error="!!editDescError"
          :error-messages="editDescError ? [editDescError] : []"
          />
        </v-form>
      </v-card-text>
        <v-card-actions>
          <v-btn text @click="editDialog = false">Annuller</v-btn>
          <v-btn :disabled="!canEdit" color="primary" @click="saveEdit">Gem</v-btn>
        </v-card-actions>   
    </v-card>
  </v-dialog>


</template>

<style scoped>
.board-bg {
  background: linear-gradient(180deg, #f3f4f6 0%, #ffffff 100%);
  min-height: 100%;
}

.glass-card {
  background:rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.6)
}
</style>
