import {CARD_LIST_TYPE} from '@/data/type'

export const baseList: Array<CARD_LIST_TYPE> = [
  {
      title: '待办',
      cardItem: [
          {title: '待办1', id: '1610000000000'},
          {title: '待办2', id: '1610000000001'},
          {title: '待办3', id: '1610000000002'},
      ],
  },
  {
      title: '进行中',
      cardItem: [
          {title: '进行中1', id: '1610000000003'},
          {title: '进行中2', id: '1610000000004'},
          {title: '进行中3', id: '1610000000005'},
      ],
  },
  {title: '完成',  cardItem: []},
]