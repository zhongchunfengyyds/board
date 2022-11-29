import useSWR from 'swr'
import {apiInitData, apiGetUserInfo} from '@/common/js/api'
import {useSetCardList} from '@/store/useCardList'
import { useEffect } from 'react'

export const useApiInitData = () => {
  const setCardList = useSetCardList()
  const { data, error } = useSWR('oa/tabulated/findByUserId', async () => await apiInitData({
    userId: '1'
  }))
  useEffect(() => {
    apiGetUserInfo()
    const resList = data?.data?.result ?? []
    const list = resList.map((item: any) => {
      return {
          title: item.tabulated.listName,
          cardItem: item.listCard,
      }
    })
    setCardList(list)
  }, [data])
  
}