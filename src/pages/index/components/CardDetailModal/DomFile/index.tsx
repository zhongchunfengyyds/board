import {memo, FC, useState} from 'react'
import type {UploadProps, UploadFile} from 'antd'
import {Button, Upload} from 'antd'
import {PaperClipOutlined, UploadOutlined} from '@ant-design/icons'
export type NewUploadFile = UploadFile & {url: string}
export interface FileProps {
    fileList?: NewUploadFile[]
    onChange?: (fileList: NewUploadFile[]) => void
}

const Index: FC<FileProps> = ({fileList = [], onChange}) => {
    const __ctx = process.env.NODE_ENV === 'development' ? '/api' : ''
    const props: UploadProps = {
        name: 'file',
        action: __ctx + '/sys/sysFile/upload',
        onChange(info) {
            let newFileList = [...info.fileList]
            newFileList = newFileList.map((file) => {
                if (file.response) {
                    file.url = file.response.url
                }
                return file
            })
            console.log(fileList)
            onChange?.(newFileList as NewUploadFile[])
        },
    }

    return (
        <div className="content-left-item">
            <PaperClipOutlined />
            <div className="right">
                <div className="title">附件</div>
                <div className="pt20"></div>
                <Upload {...props} fileList={fileList}>
                    <Button size="small" type="primary" icon={<UploadOutlined />}>
                        上传
                    </Button>
                </Upload>
            </div>
        </div>
    )
}
export default memo(Index)
