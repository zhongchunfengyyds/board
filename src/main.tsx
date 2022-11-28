import React, {Suspense, lazy} from 'react'
import {RecoilRoot} from 'recoil'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ConfigProvider} from 'antd'
const Index = lazy(() => import('@/pages/index'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0088ec',
                },
            }}>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Index />} />
                    </Routes>
                </Suspense>
            </Router>
        </ConfigProvider>
    </RecoilRoot>,
)
