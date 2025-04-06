// 今までのコード
// import React from "react";


// const DayDetailModal = ({ date, onClose, onAdd }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg w-[400px]">
//         <h2 className="text-xl font-bold mb-4">{date} の予定</h2>

//         <div className="mb-4">
//           <label className="block font-medium">新しく追加する予定</label>
//           <textarea id ="todocontents" className="w-full border p-2 rounded" rows="4" />
//         </div>

//         {/* <div className="mb-4">
//           <label className="block font-medium">日記 (option)</label>
//           <textarea className="w-full border p-2 rounded" rows="4" />
//         </div> */}

//         <div className="flex justify-end gap-4">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">閉じる</button>
//           <button onClick={onAdd} className="px-4 py-2 bg-blue-500 text-white rounded">追加</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayDetailModal;

// // それなりによしと感じたコード
// import React, { useState } from "react";

// const DayDetailModal = ({ date, onClose, onAdd }) => {
//   const [content, setContent] = useState("");  // 予定内容の入力内容を管理

//   const handleAdd = () => {
//     if (!content.trim()) {
//       alert("予定を入力してください");
//       return;
//     }
//     onAdd(content); // 親コンポーネントに予定内容を渡す
//     setContent(""); // 入力内容をリセット
//     onClose(); // モーダルを閉じる
//   };

//   return (
//     <div className = "mordal-component">
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div
//           style={{
//             width: "400px",
//             padding: "20px",
//             backgroundColor: "white",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//             borderRadius: "8px",
//             display: "flex",        // 子要素を中央に配置するために追加
//             flexDirection: "column", // 子要素を縦並びに配置
//             zIndex: 1000, // 必要なら
//           }}
//         >
//           <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
//             {date} の予定
//           </h2>
//           <div className="todolist"></div>
//           <textarea
//             id="todocontents"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginBottom: "20px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               resize: "none",
//             }}
//             rows="4"
//             placeholder="予定内容を入力..."
//           />
//           <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//             <button
//               onClick={onClose}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#ccc",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               閉じる
//             </button>
//             <button
//               onClick={handleAdd}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#007BFF",
//                 color: "white",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               追加
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayDetailModal;


// これはとても良いと思ったcssを変更した
import React, { useState, useEffect } from "react";

const DayDetailModal = ({ date, onClose, onAdd }) => {
  const [content, setContent] = useState("");  // 予定内容の入力内容を管理
  const [todos, setTodos] = useState([
    { text: '買い物に行く', isChecked: false },
    { text: '洗濯をする', isChecked: false },
    { text: '掃除をする', isChecked: false },
  ]);    // ToDoリストの状態管理

  const handleAddSchedule = async (e) => {
    alert(`${selectedDate}のTODOリストに${e} の予定を追加しました！`);
    fetchItems();
      // ここで送信
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 実際に送受信するデータ
        body: JSON.stringify({ id: Date.now().toString(), date: selectedDate,name: e,A : "好きな生年月日" }),
      });
    console.log("送信済")
    setSelectedDate(null);
  };

  const API_URL = 'http://localhost:5000/items';

  // 送信するデータを定義する変数
  const fetchItems = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = () => {
    if (!content.trim()) {
      alert("予定を入力してください");
      return;
    }
    onAdd(content); // 親コンポーネントに予定内容を渡す
    setContent(""); // 入力内容をリセット
    onClose(); // モーダルを閉じる
  };

  const handleTodoAdd = () => {
    if (!content.trim()) {
      alert("ToDo内容を入力してください");
      return;
    }
    setTodos([...todos, { text: content, isChecked: false }]); // 新しいToDoを追加
    setContent(""); // 入力内容をリセット
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    setTodos(updatedTodos); // チェック状態を更新
  };

  return (
    <div className="mordal-component">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div
          style={{
            width: "400px",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            {date} の予定
          </h2>
          {/* To-Do リスト表示部分 */}
          <div className="todolist">
            <h3>To-Do List</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {todos.map((todo, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={todo.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                    style={{ marginRight: "10px" }}
                  />
                  <span
                    style={{
                      textDecoration: todo.isChecked ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 入力エリア */}
          <textarea
            id="todocontents"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "none",
            }}
            rows="4"
            placeholder="予定内容を入力..."
          />

          {/* ToDoを追加するボタン */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              閉じる
            </button>

            <button
              onClick={handleAdd}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetailModal;



// //databaseのget部分の実装ができたら、毎回データをfetchしてくることでモーダルのtodolistを更新できるかもなので以下のコード例を載せておきます。
// import React, { useState, useEffect } from "react";

// const DayDetailModal = ({ date, onClose, onAdd }) => {
//   const [content, setContent] = useState("");  // 予定内容の入力内容を管理
//   const [todos, setTodos] = useState([]);     // ToDoリストの状態管理
  
//   const API_URL = "http://localhost:5000/todos"; // データベースの API URL (仮)

// // モーダルが開かれた時に To-Do リストを取得
// useEffect(() => {
//   const fetchTodos = async () => {
//     try {
//       const res = await fetch(`${API_URL}?date=${date}`);
//       const data = await res.json();
//       setTodos(data);  // データベースから取得した To-Do リストを状態に保存
//     } catch (error) {
//       console.error("To-Do リストの取得に失敗しました:", error);
//     }
//   };

//   if (date) {
//     fetchTodos();  // 日付が選択されたら To-Do を取得
//   }
// }, [date]); // `date` が変わるたびに実行される

// const handleAdd = () => {
//   if (!content.trim()) {
//     alert("予定を入力してください");
//     return;
//   }
//   onAdd(content); // 親コンポーネントに予定内容を渡す
//   setContent(""); // 入力内容をリセット
//   onClose(); // モーダルを閉じる
// };

// const handleTodoAdd = () => {
//   if (!content.trim()) {
//     alert("ToDo内容を入力してください");
//     return;
//   }
//   const newTodo = { text: content, isChecked: false, date };
//   // 新しい To-Do をデータベースに送信
//   const addTodoToDB = async () => {
//     try {
//       await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newTodo),
//       });
//       setTodos([...todos, newTodo]); // 状態に新しい To-Do を追加
//       setContent(""); // 入力内容をリセット
//     } catch (error) {
//       console.error("To-Do の追加に失敗しました:", error);
//     }
//   };
//   addTodoToDB();
// };

// const handleCheckboxChange = (index) => {
//   const updatedTodos = [...todos];
//   updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
//   setTodos(updatedTodos); // チェック状態を更新
// };

// return (
//   <div className="modal-component">
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div
//         style={{
//           width: "400px",
//           padding: "20px",
//           backgroundColor: "white",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           borderRadius: "8px",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 1000,
//         }}
//       >
//         <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
//           {date} の予定
//         </h2>
        
//         {/* To-Do リスト表示部分 */}
//         <div className="todolist">
//           <h3>To-Do List</h3>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {todos.map((todo, index) => (
//               <li key={index} style={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   type="checkbox"
//                   checked={todo.isChecked}
//                   onChange={() => handleCheckboxChange(index)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <span
//                   style={{
//                     textDecoration: todo.isChecked ? "line-through" : "none",
//                   }}
//                 >
//                   {todo.text}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* 入力エリア */}
//         <textarea
//           id="todocontents"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "20px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             resize: "none",
//           }}
//           rows="4"
//           placeholder="予定内容を入力..."
//         />

//         {/* ToDoを追加するボタン */}
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <button
//             onClick={onClose}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#ccc",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             閉じる
//           </button>

//           <button
//             onClick={handleTodoAdd}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#007BFF",
//               color: "white",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             追加
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };

// export default DayDetailModal;

