// import './TodoList.css';

// function TodoList({ items, onEdit, onDelete }) {
//   return (
//     <div className="todo-wrapper">
//       <h2>📝 ToDoリスト</h2>
//       <ul className="todo-list">
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name}
//             <button onClick={() => onEdit(item)}>編集</button>
//             <button onClick={() => onDelete(item.id)}>削除</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;
import './TodoList.css';

function TodoList({ items, onEdit, onDelete }) {
  return (
    <div className="todo-wrapper">
      <h2>📝 ToDoリスト</h2>
      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id}>
            {/* ✅ チェック状態と時間を表示 */}
            <label>
              <input
                type="checkbox"
                checked={item.IsCheacked}
                readOnly // 編集はここではできない
              />
              <span style={{ textDecoration: item.IsCheacked ? 'line-through' : 'none' }}>
                {item.name}
              </span>
              {item.Time && (
                <span style={{ marginLeft: '1rem', fontSize: '0.9rem', color: '#888' }}>
                  ⏰ {item.Time}
                </span>
              )}
            </label>
            <button onClick={() => onEdit(item)}>編集</button>
            <button onClick={() => onDelete(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
