import { useRecoilState } from 'recoil'
import { ShareMsg, CardListState } from './index'
import { CARD_LIST_TYPE, } from '@/data/type'
export const useShareMsg = () => {
    const [shareMsg, setShareMsg] = useRecoilState(ShareMsg)
    const [cardList, setCardList] = useRecoilState(CardListState)
    // 详情弹框更新数据
    const setShareMsgAction = (val: any) => {
        setShareMsg(val)
        const cardListCopy = JSON.parse(JSON.stringify(cardList))
        cardListCopy.forEach((element: CARD_LIST_TYPE) => {
            element.cardItem.forEach((item: any) => {
                if (item.id === val.card.id) {
                    Object.assign(item, val.card)
                }
            })
        });
        setCardList(cardListCopy)
    }
    return {
        shareMsg,
        setShareMsg,
        setShareMsgAction
    }
}
