import { cards } from '@/composables/boardState'

export function useCardUpdate() {
    function update(id: string, title: string, description: string) {
        const cardToUpdate = cards.value.find(card => card.id === id)
        if (!cardToUpdate) {
            return
        }
        cardToUpdate.title = title
        cardToUpdate.description = description
    }
    return { update }
}