export interface Offer {
    id: number
    title: string
    description: string
    organization: []
    date_start: string
    date_end: string
    quantity_per_hand: number
    client_level: number
    image_promo?: string
    addresses?: string[]
    is_activate: boolean
}

export interface Coupons {
    id: number
    offer_id: number
    title: string
    date_start: string
    date_end: string
    image_promo: string
    code: string
}
