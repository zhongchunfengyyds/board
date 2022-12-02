import { apiInitData, apiGetUserInfo } from '@/common/js/api'
import { useSetCardList } from '@/store/useCardList'
import { useUserInfo } from '@/store/useUserInfo'
import { useCallback, useEffect, useState } from 'react'

export const useApiInitData = () => {
    const [Loading, setLoading] = useState(true)
    const setCardList = useSetCardList()
    const { setUserInfoData } = useUserInfo()

    const init = useCallback(async () => {
        let { data: { user } } = await apiGetUserInfo()
        let res = await apiInitData({
            userId: user.id
        })
        const result = res.data.result
        setUserInfoData(user)
        const list = result.map((item: any, index: number) => {
            return {
                listName: item.tabulated.listName,
                cardItem: item.listCard,
                id: item.tabulated.id,
                sort: item.tabulated.sort || index + 1
            }
        })
        setCardList(list)
        setLoading(false)
    }, [])
    useEffect(() => {
        init()
    }, [])
    return {
        Loading
    }
}