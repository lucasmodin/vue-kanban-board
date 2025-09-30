import { describe, it, expect, beforeEach } from "vitest";
import { useCreateCard } from '@/composables/useCardCreate'
import { cards } from '@/composables/boardState'

describe('useCreateCard', () => {
    beforeEach(() => {
        cards.value = []
    })

    it('should add a card object to the cards state array', () => {
        const { create } = useCreateCard();
        create('test title', 'test description', 'backlog')

        expect(cards.value.length).toBe(1)
        const card = cards.value[0]!
        expect(card.title).toBe('test title')
        expect(card.description).toBe('test description')
        expect(card.status).toBe('backlog')
    })

    it('should generate a unique id', () => {
        const { create } = useCreateCard();
        create('card 1', 'desc 1', 'backlog')
        create('card 2', 'desc 2', 'backlog')

        expect(cards.value[0]?.id).not.toBe(cards.value[1]?.id)
    })




})