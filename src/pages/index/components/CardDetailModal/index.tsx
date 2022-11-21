import React, {FC, useRef, ChangeEvent, useEffect, useState} from 'react'

import BoardModal from '@/components/BoardModal'
import './index.scss'

interface PropsType {
    show: boolean
    id: string
    onClose?: () => void
}
const Index: FC<PropsType> = ({show, id, onClose}) => {
    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                <div className="left"></div>
                <div className="right"></div>
            </div>
        </BoardModal>
    )
}

export default Index
