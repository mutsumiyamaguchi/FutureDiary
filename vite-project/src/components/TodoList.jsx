import './TodoList.css';

function TodoList({ items, onEdit, onDelete }) {
  return (
    <div className="todo-wrapper">
      <h2>📝 ToDoリスト</h2>
      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => onEdit(item)}>編集</button>
            <button onClick={() => onDelete(item.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
