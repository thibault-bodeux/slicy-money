declare global {
  namespace Amount {
    interface Label {
      type: string
      value: number
      currency: string
    }

    interface Devise {
      value: number
      label: Amount.Label
      limit: {
        active: boolean
        quantity: number
      }
    }

    interface Result {
      value: number
      label: Amount.Label
      quantity: number
      total: number
    }
  }
}

export {}
