import { atom } from 'recoil'
import { CARD_ITEM_TYPE, CARD_LIST_TYPE, CARD_DETAIL_TYPE } from '@/data/type'

export const CardListState = atom<Array<CARD_LIST_TYPE>>({ // cardList数据源
    key: 'CardList',
    default: []
})



export const ShareMsg = atom<CARD_DETAIL_TYPE | CARD_ITEM_TYPE | any>({ // 共享数据
    key: 'ShareMsg',
    default: {}
})

export const UserInfo = atom<any>({ // 用户信息
    key: 'UserInfo',
    default: {}
})
