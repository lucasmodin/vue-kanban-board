import { describe, it, expect, beforeEach} from 'vitest'
import { useCardUpdate } from '@/composables/useCardUpdate'
import { cards } from '@/composables/boardState'
import type { Card } from '@/domain/card'


describe('useCardUpdate', () => {
    beforeEach(() => {
        cards.value = []
    })

    it('should find a card element in the state array and update it', () => {

        const idToSearch = crypto.randomUUID()

        const card: Card = {
            id: idToSearch,
            title: 'old title',
            description: 'old description',
            status: 'backlog'
        }

        cards.value.push(card)
        expect(cards.value.length).toBe(1)
        expect(cards.value[0]!.title).toBe('old title')
        
        const { update } = useCardUpdate()

        const newTitle = 'new title'
        const newDescription = 'new description'
        const newStatus = 'doing'

        update(idToSearch, newTitle, newDescription, newStatus)
        expect(cards.value[0]!.title).toBe('new title')
        expect(cards.value[0]!.description).toBe('new description')
        expect(cards.value[0]!.status).toBe('doing')
    })
})