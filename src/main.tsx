import React, {Suspense, lazy} from 'react'
import {RecoilRoot} from 'recoil'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, HashRouter} from 'react-router-dom'
// react history 路由
import {ConfigProvider} from 'antd'
import Loading from '@/components/Loading'

const Index = lazy(() => import('@/pages/index'))
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0088ec',
                },
            }}>
            <HashRouter>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Index />} />
                    </Routes>
                </Suspense>
            </HashRouter>
        </ConfigProvider>
    </RecoilRoot>,
)
