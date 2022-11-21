import { atom } from 'recoil'
import { baseList } from '@/data/cardList'
import {CARD_LIST_TYPE} from '@/data/type'

export const CardListState = atom<Array<CARD_LIST_TYPE>>({
  key: 'CardList',
  default: baseList
})
