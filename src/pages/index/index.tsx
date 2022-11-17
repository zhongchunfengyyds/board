import './index.scss'
import ContentCard from './content-card'
const App = () => {
    const data = [14, 2, 7]
    const addBoard = () => {
        data.push(1)
        console.log(data)
    }
    return (
        <div className="board">
            {data.map((item, index) => (
                <div key={index} className="board-item" style={{height: 20 * item + 'px'}}>
                    <div className="board-item-title"></div>
                    <div className="board-item-content">
                        <ContentCard data={item} />
                    </div>
                </div>
            ))}
            <div className="board-add" onClick={addBoard}>
                添加看板
            </div>
        </div>
    )
}
export default App
