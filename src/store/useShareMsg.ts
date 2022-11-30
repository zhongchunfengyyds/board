import { useRecoilState } from 'recoil'
import { ShareMsg } from './index'

export const useShareMsg = () => {
  const [shareMsg, setShareMsg] = useRecoilState(ShareMsg)
  return {
    shareMsg,
    setShareMsg
  }
}
