export interface CARD_ITEM_TYPE {
  value: string
  timestamp: number
}

export interface CARD_LIST_TYPE {
  title: string | number
  cardItem?: CARD_ITEM_TYPE[]
}