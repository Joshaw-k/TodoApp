import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [checked, setChecked] = useState(false);
  const [strikethrough, setstrikethrough] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        checked: false,
        strikethrough: false,
      };

      setList([...list, newItem]);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handlecheck = (id) => {
    const specificItem = list.find((item) => item.id == id);
    setChecked(!specificItem.checked);
    return checked;
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>TodoApp</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            removeItem={removeItem}
            handlecheck={handlecheck}
          />
        </div>
      )}
    </section>
  );
}

export default App;
