import {FC, useEffect, useState} from 'react'
import {message, Button} from 'antd'
import {MenuUnfoldOutlined} from '@ant-design/icons'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

export interface DesProps {
    des?: string
    onChange?: (value: string) => void
}

const Index: FC<DesProps> = ({des = '', onChange}) => {
    const __ctx = process.env.NODE_ENV === 'development' ? '/api' : ''
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
    // 编辑器内容
    const [html, setHtml] = useState(des)
    const [showEditor, setShowEditor] = useState(true)
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: __ctx + '/sys/sysFile/upload', // 上传图片地址
                timeout: 5 * 1000000, // 5s
                fieldName: 'file',
                customInsert(res: any, insertFn: any) {
                    // res 即服务端的返回结果
                    // 从 res 中找到 url alt href ，然后插图图片
                    if (res.isOk) {
                        let url = __ctx + '/sys/sysFile/previewImage?fileId=' + res.data
                        insertFn(url, '图片加载失败')
                    } else {
                        message.error(res.msg)
                    }
                },
                // 单个文件上传失败
                onFailed(file: File, res: any) {
                    console.log(`${file.name} 上传失败`, res)
                    message.error(`${file.name} 上传失败`)
                },

                // 上传错误，或者触发 timeout 超时
                onError(file: File, err: any, res: any) {
                    console.log(`${file.name} 上传出错`, err, res)
                    message.error(`${file.name} 上传失败`)
                },
            },
        },
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <div className="content-left-item">
            <MenuUnfoldOutlined />
            <div className="right">
                <div className="title">
                    描述
                    {showEditor && (
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                setShowEditor(false)
                                onChange?.(html)
                            }}>
                            完成
                        </Button>
                    )}
                </div>
                <div className="pt10"></div>
                {!showEditor ? (
                    <>
                        <div
                            className="desc cursor-pointer"
                            dangerouslySetInnerHTML={{__html: html}}
                            onClick={() => setShowEditor(true)}></div>
                    </>
                ) : (
                    <>
                        <div style={{border: '1px solid #ccc', zIndex: 100}}>
                            <Toolbar
                                editor={editor}
                                defaultConfig={toolbarConfig}
                                mode="default"
                                style={{borderBottom: '1px solid #ccc'}}
                            />
                            <Editor
                                defaultConfig={editorConfig}
                                value={html}
                                onCreated={setEditor}
                                onChange={(editor) => {
                                    setHtml(editor.getHtml())
                                }}
                                mode="default"
                                style={{height: '500px', overflowY: 'hidden'}}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Index
