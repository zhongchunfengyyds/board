import useSWR from 'swr'
import { apiInitData, apiGetUserInfo } from '@/common/js/api'
import { useSetCardList } from '@/store/useCardList'
import { useUserInfo } from '@/store/useUserInfo'
import { useEffect } from 'react'

export const useApiInitData = () => {
    const setCardList = useSetCardList()
    const { setUserInfo } = useUserInfo()
    const { data: user } = useSWR('org/userResource/userMsg', async () => await apiGetUserInfo())
    const { data, error, mutate } = useSWR({ url: 'oa/tabulated/findByUserId', args: user }, async () => await apiInitData({
        userId: user?.data?.user?.id ?? ''
    }))
    useEffect(() => {
        console.log(data)
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