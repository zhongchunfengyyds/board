import { atom } from 'recoil'
import { CARD_ITEM_TYPE, CARD_LIST_TYPE } from '@/data/type'

export const CardListState = atom<Array<CARD_LIST_TYPE>>({ // cardList数据源
    key: 'CardList',
    default: []
})

export const CurrenCardtItem = atom<CARD_ITEM_TYPE>({ // 当前选中的cardItem
    key: 'currentItem',
    default: { title: '', id: ''}
})
