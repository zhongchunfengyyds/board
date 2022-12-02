import { useRecoilState } from 'recoil'
import { UserInfo } from './index'
export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)
    return {
        userInfo,
        setUserInfo
    }
}
