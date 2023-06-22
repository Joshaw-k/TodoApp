import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, handlecheck }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className={`title ${checked ? "strikethrough" : ""}`}>{title}</p>
            <div className="btn-container">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!handlecheck(id))}
              />
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
