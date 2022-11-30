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
// export const ShareMsg = atom<CARD_DETAIL_TYPE>({ // 当前选中的cardItem
//     key: 'currentItem',
//     default: {
//         card: {
//             title: '',
//             id: '',
//             background: '',
//             archiving: 0,
//             createTime: '',
//             creatorId: '',
//             creatorName: '',
//             isDeleted: 0,
//             modifiedTime: '',
//             modifierId: '',
//             modifierName: '',
//             params: {},
//             sort: 0,
//             tabulatedId: '',
//             color: '',
//             details: ''
//         },
//         commentList: [],
//         inventoryList: []
//     }
// })
