import { useState, useRef, useEffect } from "react";
// import DatePicker from "./components/DatePicker";
import { DatePicker } from "me-date-picker";
import "me-date-picker/dist/style.css";
import "./App.less";

function App() {
  const [props, setProps] = useState({
    value: "2022-9-16",
    weekFormat: "zh",
    lang: "zh",
  });

  const pickerRef = useRef();

  pickerRef.getValue = (value) => {
    setProps({ ...props, value });
  };

  const changeLang = (e) => {
    let lang = e.target.value;
    setProps({ ...props, lang });
  };
  const changeFormat = (e) => {
    let weekFormat = e.target.value;
    setProps({ ...props, weekFormat });
  };

  return (
    <div className="App">
      <div>{"日期值：" + props.value}</div>
      <div>
        {"语言："}
        <select name="" id="" onChange={changeLang}>
          <option value="zh">{"zh"}</option>
          <option value="en">{"en"}</option>
        </select>
      </div>
      <div>
        {"格式："}
        <select name="" id="" onChange={changeFormat}>
          <option value="zh">{"zh"}</option>
          <option value="en">{"en"}</option>
        </select>
      </div>
      <br />
      <DatePicker {...props} ref={pickerRef}></DatePicker>
    </div>
  );
}

export default App;
