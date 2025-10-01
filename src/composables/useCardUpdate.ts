import { cards } from '@/composables/boardState'
import type { Status } from '@/domain/card'

export function useCardUpdate() {
    function update(id: string, title: string, description: string, status: Status) {
        const cardToUpdate = cards.value.find(card => card.id === id)
        if (!cardToUpdate) {
            return
        }
        cardToUpdate.title = title
        cardToUpdate.description = description
        cardToUpdate.status = status
    }
    return { update }
}