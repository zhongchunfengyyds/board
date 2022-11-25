import React, {FC, useMemo, ChangeEvent, useEffect, useState, memo} from 'react'
import {
    Mentions,
    Button,
    Checkbox,
    Col,
    Row,
    Popover,
    List,
    Tag,
    Divider,
    Input,
    DatePicker,
    message,
    Upload,
} from 'antd'
import {
    CreditCardOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    CommentOutlined,
    CloseOutlined,
    CheckSquareOutlined,
    FieldTimeOutlined,
    PaperClipOutlined,
    ColumnHeightOutlined,
    ShareAltOutlined,
    ContainerOutlined,
    UploadOutlined,
} from '@ant-design/icons'
const {Option} = Mentions
const {TextArea} = Input
const {RangePicker} = DatePicker
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import BoardModal from '@/components/BoardModal'
import './index.scss'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Comment, CheckList} from '@/data/type'
import type {UploadProps, UploadFile} from 'antd'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'

interface PropsType {
    show: boolean
    cardId: string
    onClose?: () => void
}

const Index: FC<PropsType> = ({show, cardId, onClose}) => {
    const __ctx = process.env.NODE_ENV === 'development' ? '/api' : ''
    // 头部标题时间等等 -------------------------------------------
    const [dateOpen, setDateOpen] = useState(false)
    const [date, setDate] = useState<string[]>([])
    const updateDate = () => {
        setDateOpen(false)
    }
    const AddDateDom = useMemo(() => {
        return (
            <>
                <RangePicker
                    locale={locale}
                    onChange={(e, date) => {
                        setDate(date)
                    }}
                />
                <div></div>
                <Button className="mt10" size="small" type="primary" onClick={updateDate}>
                    完成
                </Button>
            </>
        )
    }, [dateOpen])
    const titleDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <CreditCardOutlined />
                <div className="right">
                    <h3>标题</h3>
                    <div className="desc pt10">介绍</div>
                    {date.length > 0 && (
                        <div className="desc pt10">
                            时间：
                            {date.map((item, index) => {
                                if (index === 0) {
                                    return <span key={index}>{item}</span>
                                } else {
                                    return <span key={index}> 至 {item}</span>
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }, [date])

    // 清单 -------------------------------------------
    const [checkListOpen, setCheckListOpen] = useState(false)
    const [checkList, setCheckList] = useState<CheckList[]>([])
    const [checkListInput, setCheckListInput] = useState('')
    const newChecklist = () => {
        setCheckList([
            ...checkList,
            {
                items: checkListInput,
                isAccomplish: false,
                cardId,
            },
        ])
        setCheckListInput('')
        setCheckListOpen(false)
    }
    //  所有清单dom
    const ChecklistDom = useMemo(() => {
        return (
            checkList.length > 0 && (
                <div className="content-left-item">
                    <OrderedListOutlined />
                    <div className="right">
                        <div className="title">清单</div>
                        <div className="pt12"></div>
                        <Checkbox.Group style={{width: '100%'}}>
                            <Row gutter={[0, 10]}>
                                {checkList.map((item, index) => {
                                    return (
                                        <Col span={24} key={index}>
                                            <Checkbox value={item.items}>{item.items}</Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
            )
        )
    }, [checkList])
    //  添加清单dom
    const AddCheckListDom = useMemo(() => {
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
    }, [checkListInput])

    //评论 -------------------------------------------
    const data = [
        {
            commentName: '张三',
            commentContent: '有多少爱可以重来，有多少人愿意等待',
            cardId: '1',
            commentId: '1',
        },
    ]
    const [commentList, setCommentList] = useState<Comment[]>(data)
    const [commentValue, setCommentValue] = useState('')
    const newComment = () => {
        console.log(commentValue)
        // 调接口评论
        commentList.push({
            commentName: '张三',
            commentContent: commentValue,
            cardId: '1',
            commentId: '1',
        })
        setCommentList([...commentList])
        setCommentValue('')
    }
    const CommentDom = useMemo(() => {
        return (
            <div className="content-left-item">
                <CommentOutlined />
                <div className="right">
                    <div className="title">评论</div>
                    <div className="pt10"></div>
                    <div className="comment">
                        <Mentions
                            autoSize
                            value={commentValue}
                            onChange={(e: string) => {
                                setCommentValue(e)
                            }}
                            style={{width: '100%'}}
                            placeholder="添加评论"></Mentions>
                        <div className="mt10"></div>
                        <Button size="small" type="primary" onClick={newComment}>
                            评论
                        </Button>
                        <div className="mt20"></div>
                        <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={commentList}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta title={item.commentName} description={item.commentContent} />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }, [commentList, commentValue])

    // 颜色 -------------------------------------------
    const [color, setColor] = useState('orange')
    const colorList = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#f50', '#2db7f5', '#87d068', '#108ee9']
    const popoverDom = useMemo(() => {
        return (
            <div className="header-popover">
                <Divider orientation="left">颜色</Divider>
                <div className="tags">
                    {colorList.map((item, index) => {
                        return (
                            <Tag
                                className="cursor-pointer"
                                color={item}
                                key={index}
                                onClick={() => {
                                    setColor(item)
                                }}></Tag>
                        )
                    })}
                </div>
                <div className="mt20"></div>
                <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                        setColor('')
                    }}>
                    移除颜色
                </Button>
            </div>
        )
    }, [color])

    // 描述 -------------------------------------------
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
    // 编辑器内容
    const [html, setHtml] = useState('')
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
    // // 模拟 ajax 请求，异步设置 html
    const DesDOm = useMemo(() => {
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
    }, [html, editor, showEditor])
    // 附件 ------------------------
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        },
    ])
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

            setFileList(newFileList)
        },
    }
    const fileDom = useMemo(() => {
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
    }, [fileList])
    return (
        <BoardModal show={show} onClose={onClose}>
            <div className="card-detail-modal">
                {color && (
                    <header style={{background: color}}>
                        <Popover placement="bottomLeft" content={popoverDom} trigger="click">
                            <Button type="text">拉伸</Button>
                        </Popover>
                    </header>
                )}
                <div className="close">
                    <Button shape="circle" type="text" icon={<CloseOutlined />} onClick={onClose} />
                </div>
                <div className="content">
                    <div className="content-left">
                        {titleDom}
                        {DesDOm}
                        {ChecklistDom}
                        {fileDom}
                        {CommentDom}
                    </div>
                    <div className="content-right">
                        <Divider orientation="left">建议的标签</Divider>
                        <Popover
                            placement="bottomLeft"
                            content={AddCheckListDom}
                            trigger="click"
                            open={checkListOpen}
                            onOpenChange={() => {
                                setCheckListOpen(true)
                            }}>
                            <Button type="primary" block icon={<CheckSquareOutlined />}>
                                清单
                            </Button>
                        </Popover>
                        <Popover
                            placement="bottomLeft"
                            content={AddDateDom}
                            trigger="click"
                            open={dateOpen}
                            onOpenChange={() => {
                                setDateOpen(true)
                            }}>
                            <Button className="mt10" type="primary" block icon={<FieldTimeOutlined />}>
                                日期
                            </Button>
                        </Popover>

                        <Popover placement="bottomLeft" content={popoverDom} trigger="click">
                            <Button className="mt10" type="primary" block icon={<ColumnHeightOutlined />}>
                                拉伸
                            </Button>
                        </Popover>
                        <Divider orientation="left">操作</Divider>
                        <Button type="primary" block icon={<ShareAltOutlined />}>
                            分享
                        </Button>
                        <Button className="mt10" type="primary" block icon={<ContainerOutlined />}>
                            归档
                        </Button>
                    </div>
                </div>
            </div>
        </BoardModal>
    )
}

export default memo(Index) // 等同于你刚的效果
