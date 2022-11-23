export interface CARD_ITEM_TYPE {
    title: string
    id: string
    background?: string
}

export interface CARD_LIST_TYPE {
    title: string | number
    cardItem: CARD_ITEM_TYPE[]
}

export interface Comment {
    commentName: string // 评论人
    commentContent: string // 评论内容
    commentId: string // 评论人id
    cardId: string // 评论的卡片id
}

export interface CheckList {
    items: string // 任务名
    isAccomplish: boolean // 是否完成
    cardId: string // 任务所属卡片id
}