import { it, describe, expect, beforeEach } from 'vitest'
import { useMoveCard } from '@/composables/useMoveCard'
import { cards } from '@/composables/boardState'
import type { Card, Status } from '@/domain/card'

describe('useMoveCard', () => {
    beforeEach(() => {
        cards.value = []
    })

    it('should find a card element in the state array and change the status', () => {
        const card: Card = {
            id: crypto.randomUUID(),
            title: 'test title',
            description: 'test description',
            status: 'backlog'
        }

        cards.value.push(card)
        expect(cards.value.length).toBe(1)
        expect(cards.value[0]!.status).toBe('backlog')

        const { moveCard } = useMoveCard()

        const statusAfter: Status = 'doing'
        const result: boolean = moveCard(card.id, statusAfter)
        expect(cards.value[0]!.status).toBe(statusAfter)
        expect(result).toBe(true)
    })
})