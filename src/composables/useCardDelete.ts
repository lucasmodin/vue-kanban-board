import { cards } from '@/composables/boardState'

export function useDeleteCard() {
    function remove(id: string) {
        const index: number = cards.value.findIndex(c => c.id === id)
        if (index !== -1) {
            cards.value.splice(index, 1)
        }
    }
    return { remove }
}