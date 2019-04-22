import React from "react";
import ReactDOM from "react-dom";
import "../styles.css";
import NMoreExample from '/NMore';
import SmartBoxExample from './SmartBox';

function App() {
  return (
    <div className="AppContainer">
      {/*<SmartBoxExample />*/}
      <NMoreExample />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
