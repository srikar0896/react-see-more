import React from "react";
import ReactDOM from "react-dom";
import "src/styles.css";
import NMoreExample from './examples/NMore';
import SmartBoxExample from './examples/SmartBox';

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
