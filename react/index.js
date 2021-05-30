const {useEffect, useRef, useState} = window.React;
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
    },
  };
  useEffect(() => {
    console.log("useEffect", props);
  }, []);
  useEffect(function () {
    console.log("state useEffect", state.num, arguments);
  }, [state, num2]);
  return <div>
    <button onClick={fun.update}>{state.num}</button>
    <button onClick={fun.setNum2}>{num2}</button>
  </div>;
};
const root = React.createElement(() => {
  const [show, setShow] = useState(false);
  return <div>
    <button onClick={() => setShow(true)}>show</button>
    {show && (<CompsButton test={123123}></CompsButton>)}
  </div>;
});

ReactDOM.render(<h1>{root}</h1>, document.getElementById("example"));