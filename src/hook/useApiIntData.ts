import useSWR from 'swr'
import { apiInitData, apiGetUserInfo } from '@/common/js/api'
import { useSetCardList } from '@/store/useCardList'
import { useUserInfo } from '@/store/useUserInfo'
import { useEffect } from 'react'

export const useApiInitData = () => {
    const setCardList = useSetCardList()
    const { setUserInfo } = useUserInfo()
    const { data, error, mutate } = useSWR('oa/tabulated/findByUserId', async () => await apiInitData({
        userId: '1'
    }))
    useEffect(() => {
        apiGetUserInfo()
        const resList = data?.data?.result ?? []
        const list = resList.map((item: any, index: number) => {
            return {
                listName: item.tabulated.listName,
                cardItem: item.listCard,
                id: item.tabulated.id,
                sort: item.tabulated.sort || index + 1
            }
        })
        setCardList(list)
    }, [data])
}