import React, { useState, useEffect } from "react";
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [input, setInput] = useState('');

   // Function to handle task addition
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await onSearch(keyword);
    setIsLoading(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault(); // フォーム送信を防止
      handleSubmit(e); // submit的な処理
    }
  };
   return (
     <div style={{ padding: "20px" }}>
       <h1>TODO Search</h1>
       <from onSubmit={handleSubmit}>
       <input
         type="text"
         placeholder="検索したい項目を入力"
         onChange={(e) => setKeyword(e.target.value)}
         onKeyDown={(e) => handleKeyDown(e)}
         style={{ marginRight: "10px" }}
       />
       <button className="Search" disabled={isLoading} onClick={handleSubmit} type='submit'>
       <span className={`dli-search ${isLoading ? "animate-spin" : ""} transition-transform duration-300`}></span>
       <a>Search</a>       
       </button>
       </from>
       </div>
    );
 };

export default SearchForm;
