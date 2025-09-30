import type { Card } from '@/domain/card'
import { ref, computed } from 'vue'

export const cards = ref<Card[]>([])

const backlog = computed(() => cards.value.filter(card => card.status === 'backlog'))
const doing = computed(() => cards.value.filter(card => card.status === 'doing'))
const review = computed(() => cards.value.filter(card => card.status === 'review'))
const done = computed(() => cards.value.filter(card => card.status === 'done'))

export function useBoardState() {
    return { cards, backlog, doing, review, done}
}
