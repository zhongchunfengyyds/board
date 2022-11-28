import { atom } from 'recoil'
import { CARD_LIST_TYPE } from '@/data/type'

export const CardListState = atom<Array<CARD_LIST_TYPE>>({
    key: 'CardList',
    default: []
})
