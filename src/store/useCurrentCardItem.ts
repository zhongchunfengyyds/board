import { useRecoilState } from 'recoil'
import { CurrenCardtItem } from './index'

export const useCurrentCardItem = () => {
  const [currentCardItem, setCurrentCardItem] = useRecoilState(CurrenCardtItem)
  return {
    currentCardItem,
    setCurrentCardItem
  }
}
