export type Status = 'backlog' | 'doing' | 'review' | 'done'

export interface Card {
    id: string
    title: string
    description: string
    status: Status
}
