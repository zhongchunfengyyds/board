export interface CARD_ITEM_TYPE {
    title: string
    id: string 
    background?: string
}

export interface CARD_LIST_TYPE {
    title: string | number
    cardItem: CARD_ITEM_TYPE[]
}