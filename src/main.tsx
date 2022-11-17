import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './common/css/base.scss'
const Index = lazy(() => import('./pages/Index/index'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                  <Route path="/" element={<Index />} />
              </Routes>
            </Suspense>
        </Router>
    </React.StrictMode>,
)
