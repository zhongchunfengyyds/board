export interface CARD_ITEM_TYPE {
  value: string
  timestamp: number
}

export interface CARD_LIST_TYPE {
  title: string | number
  show: boolean // todo 每次添加卡片时其余添加入口关闭
  cardItem?: CARD_ITEM_TYPE[]
}