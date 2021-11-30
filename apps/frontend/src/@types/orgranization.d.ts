interface Organization {
  id: string
  title: string
  phone: string
  email: string
  retailer: string
  is_activate: boolean
  balance: number
  users?: User[]
}
