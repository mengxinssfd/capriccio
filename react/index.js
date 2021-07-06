const {useEffect, useRef, createElement, useState} = window.React;
const CompsButton = (props) => {
  console.log("props", props);
  const [state, upState] = useState({num: 1});
  const [num2, setNum2] = useState(0);

  const fun = {
    update() {
      state.num++;
      upState({...state});
    },
    setNum2() {
      setNum2(num2 => num2 + 1);
    }
  };
  useEffect(() => {
    // 只会运行一次
    console.log("props useEffect", props);
  }, []);
  useEffect(function() {
    console.log("state useEffect", state.num, arguments);
  }, [state, num2]);
  return <div>
    <button onClick={fun.update}>{state.num}</button>
    <button onClick={fun.setNum2}>{num2}</button>
    <button onClick={() => props.setCount()}>set count</button>
  </div>;
};
const CompsInput = (props) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log("inner value change", value);
  }, [value]);
  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  return <div>
    <div>inner value<input type="text" value={value} onChange={onValueChange}/></div>
    <div>outer value<input type="text" value={props.outerValue} onChange={props.setOuterValue}/></div>
  </div>;
};
const Test = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  // watch value
  useEffect(() => {
    console.log("outer value change", value);
  }, [value]);
  return <div>
    <div>{count}</div>
    <CompsButton test={123123} setCount={() => setCount(count + 1)}/>
    <CompsInput outerValue={value} setOuterValue={(e) => setValue(e.target.value)}/>
  </div>;
};
const root = createElement(() => {
  const [show, setShow] = useState(false);
  return <div>
    <button onClick={() => setShow(true)}>show</button>
    {show && (<Test/>)}
  </div>;
});

ReactDOM.render(<h1>{root}</h1>, document.getElementById("example"));