import './index.scss'
const App = () => {
    const data = [14, 2, 7]
    const addBoard = () => {
        data.push(1)
        console.log(data)
    }
    return (
        <div className="board">
            {data.map((item, index) => (
                <div className="board-item" style={{height: 20 * item + 'px'}}>
                    Item ${index + 1}
                </div>
            ))}
            <div className="board-add" onClick={addBoard}>添加看板</div>
        </div>
    )
}
export default App
