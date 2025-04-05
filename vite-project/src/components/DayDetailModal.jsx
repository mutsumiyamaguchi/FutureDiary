import React from "react";

const DayDetailModal = ({ date, onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{date} の予定</h2>

        <div className="mb-4">
          <label className="block font-medium">その日の予定</label>
          <textarea id ="todocontents" className="w-full border p-2 rounded" rows="4" />
        </div>

        {/* <div className="mb-4">
          <label className="block font-medium">日記 (option)</label>
          <textarea className="w-full border p-2 rounded" rows="4" />
        </div> */}

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">閉じる</button>
          <button onClick={onAdd} className="px-4 py-2 bg-blue-500 text-white rounded">追加</button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailModal;
