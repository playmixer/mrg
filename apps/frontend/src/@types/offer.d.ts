interface OfferAddress {
  value?: string
  geo_lat: string
  geo_lon: string
}

interface Offer {
  id: string
  title: string
  description: string
  organization: Organization|undefined
  date_start: string
  date_end: string
  quantity_per_hand: number
  client_level: number
  image_promo?: string
  addresses?: OfferAddress[]|undefined
  is_activate: boolean
}

interface Coupon {
  id: string
  offer_id: string
  title: string
  date_start: string
  date_end: string
  image_promo: string
  code: string
}
