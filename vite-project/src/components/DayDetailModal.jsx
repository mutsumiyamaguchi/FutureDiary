
// // これはとても良いと思ったcssを変更した
// import React, { useState, useEffect } from "react";

// const DayDetailModal = ({ date, onClose, onAdd }) => {
//   const [content, setContent] = useState("");  // 予定内容の入力内容を管理
//   const [todos, setTodos] = useState([
//     { text: '買い物に行く', isChecked: false ,time:"09:00"},
//     { text: '洗濯をする', isChecked: false ,time:"11:00"},
//     { text: '掃除をする', isChecked: false ,time:"11:45"},
//   ]);    // ToDoリストの状態管理
//   const [time, setTime] = useState(""); // 追加！

//   const handleAddSchedule = async (e) => {
//     alert(`${selectedDate}のTODOリストに${e}を追加しました！`);
//     fetchItems();
//       // ここで送信
//       await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // 実際に送受信するデータ
//         body: JSON.stringify({ id: Date.now().toString(), date: selectedDate,name: e,A : "好きな生年月日" }),
//       });
//     console.log("送信済")
//     setSelectedDate(null);
//   };

//   const API_URL = 'http://localhost:5000/items';

//   // 送信するデータを定義する変数
//   const fetchItems = async () => {
//     const res = await fetch(API_URL);
//     const data = await res.json();
//     setItems(data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleAdd = () => {
//     if (!content.trim()) {
//       alert("予定を入力してください");
//       return;
//     }
//     if (!time) {
//       alert("時間を指定してください");
//       return;
//     }

//     const adddata = {"text":content,"time":time,"isChecked":false}
//     onAdd(adddata); // 親コンポーネントに予定内容を渡す
//     setContent(""); // 入力内容をリセット
//     setTime("");
//     onClose(); // モーダルを閉じる
//   };

//   const handleTodoAdd = () => {
//     if (!content.trim()) {
//       alert("ToDo内容を入力してください");
//       return;
//     }
//     setTodos([...todos, { text: content, isChecked: false,time }]); // 新しいToDoを追加
//     const sortedTodos = newTodos.sort((a, b) => a.time.localeCompare(b.time));
//     setTodos(sortedTodos); // 並び替えた状態で保存
//     setContent(""); // 入力内容をリセット
//     setTime("")
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index].isChecked = !updatedTodos[index].isChecked;

//     // チェック状態更新後にソートも適用（状態自体を並び替え）
//     const sortedTodos = updatedTodos.sort((a, b) => a.time.localeCompare(b.time));
//     setTodos(sortedTodos);
//     // setTodos(updatedTodos); // チェック状態を更新
//   };

//   return (
//     <div className="mordal-component">
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div
//           style={{
//             width: "400px",
//             padding: "20px",
//             backgroundColor: "white",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//             borderRadius: "8px",
//             display: "flex",
//             flexDirection: "column",
//             zIndex: 1000,
//           }}
//         >
//           <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
//             {date} の予定
//           </h2>
//           {/* To-Do リスト表示部分 */}
//           <div className="todolist">
//             <h3>To-Do List</h3>
//             <ul style={{ listStyleType: "none", padding: 0 }}>
//               {todos
//               .slice() // 元の配列を破壊しないようにコピー
//               .sort((a, b) => a.time.localeCompare(b.time)) // 時間を文字列としてソート
//               .map((todo, index) => (
//                 <li key={index} style={{ display: "flex", alignItems: "center" }}>
//                   <input
//                     type="checkbox"
//                     checked={todo.isChecked}
//                     onChange={() => handleCheckboxChange(index)}
//                     style={{ marginRight: "10px" }}
//                   />
//                   <span
//                     style={{
//                       textDecoration: todo.isChecked ? "line-through" : "none",
//                     }}
//                   >
//                     {todo.time} {todo.text}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 入力エリア */}
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
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginBottom: "20px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />

//           {/* ToDoを追加するボタン */}
//           <div style={{ display: "flex", justifyContent: "space-between" }}>

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



import React, { useState, useEffect } from "react";

const DayDetailModal = ({ date, onClose, onAdd }) => {
  const [content, setContent] = useState("");  // 予定内容の入力内容を管理
  const [todos, setTodos] = useState([]);  // ToDoリストの状態管理
  const [time, setTime] = useState(""); // 時間入力

  const API_URL = "http://localhost:5000/items";

  // サーバーからその日のTODOリストを取得する関数
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}?date=${date}`);  // 日付でクエリパラメータを渡してリクエスト
      let data = await res.json();
      console.log("thsi",data[0])
      data = data.map((element)=>{
        let resdata={
          "id":element.id,
          "text":element.name,
          "isChecked":element.IsChecked,
          "time":element.Time,
          "date":element.date
        }
        return resdata
      })

      data.forEach((element)=>{
        console.log(element)
      })
      
      // サーバーから取得したデータが空でなければ、todosの状態を更新
      if (data && Array.isArray(data)) {
        setTodos(data);
      }else{
        setTodos(null);
      }

    } catch (error) {
      console.error("データの取得に失敗しました", error);
    }
  };

  useEffect(() => {
    fetchTodos();  // コンポーネントがマウントされたときにToDoリストを取得
  }, [date]); // dateが変更されたら再度データを取得

  const handleAdd = () => {
    if (!content.trim()) {
      alert("予定を入力してください");
      return;
    }
    if (!time) {
      alert("時間を指定してください");
      return;
    }

    const adddata = { text: content, time: time, isChecked: false };
    onAdd(adddata); // 親コンポーネントに予定内容を渡す
    setContent(""); // 入力内容をリセット
    setTime("");    // 時間をリセット
    onClose();      // モーダルを閉じる
  };

  const handleCheckboxChange = async(index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;

    // チェック状態更新後にソートも適用（状態自体を並び替え）
    const sortedTodos = updatedTodos.sort((a, b) => a.time.localeCompare(b.time));
    setTodos(sortedTodos);

    console.log("this is kakuninn",updatedTodos[index])
    
    try {
      const updatedData = {
          "id": updatedTodos[index].id,
          "date": updatedTodos[index].date,
          "IsChecked":updatedTodos[index].isChecked,
          "name": updatedTodos[index].text,
          "Time": updatedTodos[index].time
      };
  
      await fetch(`${API_URL}/${updatedTodos[index].id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // 更新したデータを送信
      });
  
      console.log("データが更新されました", updatedData);
    } catch (error) {
      console.error("データの更新に失敗しました", error);
    }
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
              {todos
                .slice() // 元の配列を破壊しないようにコピー
                .sort((a, b) => a.time.localeCompare(b.time)) // 時間を文字列としてソート
                .map((todo, index) => (
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
                      {todo.time} {todo.text}
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
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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
