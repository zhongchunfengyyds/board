import React, { FC } from 'react'
import { CARD_LIST_TYPE } from '@/data/type'

import './index.scss'

interface PropsType {
}
const ContentCard: FC<CARD_LIST_TYPE & PropsType> = ({ title = '' }) => {
    return <div className='pc-card-cont'>
        <h2>{title}</h2>
    </div>
}

export default ContentCard
