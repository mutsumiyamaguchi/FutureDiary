import React, { useState, useEffect } from "react";
import './SearchForm.css';

const DiaryForm = ({ date, onClose, onAdd }) => {
    const [keyword, setKeyword] = useState('');
   // Function to handle task addition
   const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(keyword);
  };
 
  const API_URL = 'http://localhost:5000/items';

    // 日記を取得する関数
    const fetchItems = async () => {
        const res = await fetch(`${API_URL}/Diary?date=${date}`);
        let data = await res.json();
        console.log(data)
        if(data)
        {
            setKeyword(data[0].text);
        }
    };
    

  useEffect(() => {
    fetchItems();
  }, []);

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
            {date} の日記
          </h2>

          {/* 入力エリア */}
          <textarea
            id="todocontents"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "none",
            }}
            rows="6"
            placeholder="日記を入力..."
          />

          {/* 日記を追加するボタン */}
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
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              編集
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 };

export default DiaryForm;
