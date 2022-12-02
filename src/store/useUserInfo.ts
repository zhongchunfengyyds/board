import { useRecoilState, useSetRecoilState } from 'recoil'
import { UserInfo } from './index'
export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)
    const setUserInfoData = useSetRecoilState(UserInfo)
    return {
        userInfo,
        setUserInfoData,
        setUserInfo
    }
}
