export interface CARD_ITEM_TYPE {
    title: string
    id: string
    background?: string
    archiving: number
    createTime: string
    creatorId: string
    creatorName: string
    isDeleted: number
    modifiedTime: string
    modifierId: string
    modifierName: string
    params: any
    sort: number
    tabulatedId: string
    color: string
    details: string
}

export interface CARD_LIST_TYPE {
    listName: string 
    cardItem: CARD_ITEM_TYPE[]
    id: string
}
export interface CARD_DETAIL_TYPE {
    card: CARD_ITEM_TYPE
    commentList: any[]
    inventoryList: any[]
}
export interface UserValue {
    label: string
    value: string
    head: string
}
