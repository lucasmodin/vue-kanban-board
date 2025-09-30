import { cards } from '@/composables/boardState'
import type { Card, Status } from '@/domain/card'

export function useCreateCard() {
    function create(title: string, description: string, status: Status) {
        const card: Card = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            status: status
        }
        cards.value.push(card)
    }
    return { create }
}