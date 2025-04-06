import React, { useState, useEffect } from "react";
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   // Function to handle task addition
   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await onSearch(keyword);
    setIsLoading(false);
  };
 
   return (
     <div style={{ padding: "20px" }}>
       <h1>TODO Search</h1>
 
       {}
       <input
         type="text"
         placeholder="検索したい項目を入力"
         onChange={(e) => setKeyword(e.target.value)}
         style={{ marginRight: "10px" }}
       />
       <button className="Search" disabled={isLoading} onClick={handleSubmit}>
       <span className={`dli-search ${isLoading ? "animate-spin" : ""} transition-transform duration-300`}></span>
       <a>Search</a>       
       </button>
       </div>
    );
 };

export default SearchForm;
