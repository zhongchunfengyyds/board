import './index.scss'
import {FC, memo, useMemo, useState} from 'react'
import {Popover, Button, Input} from 'antd'
const {TextArea} = Input
import {CheckSquareOutlined} from '@ant-design/icons'
import {apiCheckboxUpdate} from '@/common/js/api'
import {useShareMsg} from '@/store/useShareMsg'
const Index: FC = () => {
    const {shareMsg, setShareMsg} = useShareMsg()
    const [open, setOpen] = useState(false)
    const [checkListInput, setCheckListInput] = useState('')
    const newChecklist = () => {
        setOpen(false)
        if (!checkListInput) return
        apiCheckboxUpdate({
            items: checkListInput,
            isAccomplish: 0,
            cardId: shareMsg.card.id,
        }).then((res) => {
            const {card, commentList, inventoryList, orgUserList} = shareMsg
            setShareMsg({
                card,
                commentList,
                orgUserList,
                inventoryList: [...inventoryList, res.data.result],
            })
            setCheckListInput('')
        })
    }
    const content = () => {
        return (
            <div>
                <TextArea
                    placeholder="请输入清单内容"
                    value={checkListInput}
                    autoSize
                    onChange={(e) => {
                        setCheckListInput(e.target.value)
                    }}
                />
                <Button className="mt10" size="small" type="primary" onClick={newChecklist}>
                    添加
                </Button>
            </div>
        )
    }
    return (
        <>
            <Popover
                placement="bottomLeft"
                content={content}
                trigger="click"
                open={open}
                onOpenChange={() => {
                    setOpen(true)
                }}>
                <Button className="mt10" type="primary" block icon={<CheckSquareOutlined />}>
                    清单
                </Button>
            </Popover>
        </>
    )
}

export default memo(Index)
