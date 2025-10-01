import { describe, it, expect, beforeEach } from 'vitest'
import { cards } from '@/composables/boardState'
import { useDeleteCard } from '@/composables/useCardDelete'


describe('useDeleteCard', () => {
    beforeEach(() => {
        cards.value = []
    })

    it('should find and remove a specified index of the state array', () => {

        const { remove } = useDeleteCard();

        cards.value.push({
            id: crypto.randomUUID(),
            title: 'title 1',
            description: 'desc 1',
            status: 'backlog'
        })

        const id = cards.value[0]!.id;

        expect(cards.value.length).toBe(1)
        remove(id)
        expect(cards.value.length).toBe(0) 
    })
})