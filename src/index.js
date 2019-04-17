import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//utils
const isElementInViewPort = element => {
  console.log(element.getBoundingClientRect());
  // const { bottom } = element.getBoundingClientRect();
  // const innerHeight = window.getComputedStyle(element, null).getPropertyValue('height');
  // if (bottom > (innerHeight || document.documentElement.clientHeight)) {
    const elementTop = element.getBoundingClientRect().top;
    const parentTop = element.parentElement.getBoundingClientRect().top;
    const parentHeight = element.parentElement.getBoundingClientRect().height;
    console.log('Element Top', elementTop, `${parentTop} + ${parentHeight}(${parentTop + parentHeight})`);
  if(elementTop > (parentTop + parentHeight)){
    return false;
  } else {
    return true;
  }
  // Bottom is out of viewport
};

const SmartBox = props => {
  const SmartBoxRef = useRef();
  const [showMoreButton, setVisibility] = useState(true);
  const moveToElementView = () => {
    SmartBoxRef.current.childNodes.forEach(child => {
    if (
      child.attributes["data-id"] &&
      child.attributes["data-id"].nodeValue === "awesome"
    ) {
      const targetElement = child;
      targetElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
    });
  };

  const handleWheelDown = () => {
    SmartBoxRef.current.childNodes.forEach(child => {
      if (
        child.attributes["data-id"] &&
        child.attributes["data-id"].nodeValue === "awesome"
      ) {
        const targetElement = child;
        if (isElementInViewPort(child)) {
          console.log("Found@@");
          setVisibility(false);
        } else {
          setVisibility(true);
          console.log("Not found yet**");
        }
      }
    });  
  };
  
  useEffect(() => {
    console.log("Ref", SmartBoxRef);
    SmartBoxRef.current.addEventListener("scroll", () => {
      handleWheelDown();

      // childNode => childNode.attributes["data-id"].nodeValue === "awesome"
      // SmartBoxRef.current.childNodes.forEach(childNode => {
      //   if (
      //     Object.keys(childNode.attributes).indexOf("data-id") > -1 &&
      //     childNode.attributes["data-id"] === "awesome"
      //   ) {
      //     if (isElementInViewPort(childNode)) {
      //       console.log("Found!!!");
      //     } else {
      //       console.log("Not found Yet!!!");
      //     }
      //   }
      // });
    });
    return () => {
      if (SmartBoxRef.current) {
        console.log("============");
        SmartBoxRef.current.removeEventListener("scroll", handleWheelDown);
      }
    };
  });

  return (
    <div ref={SmartBoxRef} {...props}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {props.children}
    {showMoreButton && <div className="seeMore" onClick={() => moveToElementView()}>See More</div>}
    </div>
  );
};

function App() {
  return (
    <SmartBox className="box">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
      <p data-id={"awesome"} style={{ color: 'black' }}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
    </SmartBox>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
