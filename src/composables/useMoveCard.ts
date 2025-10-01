import { cards } from '@/composables/boardState'
import type { Card, Status } from '@/domain/card'

export function useMoveCard() {
    function moveCard(id: string, status: Status) {
        const cardToMove = cards.value.find(card => card.id === id)
        if (!cardToMove) {
            return false
        }
        cardToMove.status = status  
        return true
    }
    return { moveCard }
}

