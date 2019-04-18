import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { log } from './utils';
import "./styles.css";

const isElementInViewPort = element => {
  const elementTop = element.getBoundingClientRect().top;
  const parentTop = element.parentElement.getBoundingClientRect().top;
  const parentHeight = element.parentElement.getBoundingClientRect().height;
  if(elementTop > (parentTop + parentHeight)){
    return false;
  } else {
    return true;
  }
};

const SmartBox = props => {
  const SmartBoxRef = useRef();
  const [showMoreButton, setVisibility] = useState(true);
  const [smartTags, setSmartTags] = useState(props.tags);
  useEffect(() => {
    log('Set Smart Tags', props.tags);
    setSmartTags(props.tags);
  }, []);
    const moveToElementView = () => {
      SmartBoxRef.current.childNodes.forEach(child => {
        if (
          child.attributes["data-id"] &&
          child.attributes["data-id"].nodeValue === smartTags[0].tagId
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
        child.attributes["data-id"].nodeValue === smartTags[0].tagId
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
    SmartBoxRef.current.addEventListener("scroll", () => {
      handleWheelDown();
    });
    return () => {
      if (SmartBoxRef.current) {
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
      {
        showMoreButton && (
          <div className="seeMore" onClick={() => moveToElementView()}>
            See More
          </div>
        )
      }
    </div>
  );
};

function App() {
  return (
    <SmartBox className="box" tags={[
      { tagLabel: 'see Awesome1', tagId: 'awesome1'},
      { tagLabel: 'see Awesome2', tagId: 'awesome2'},
      { tagLabel: 'see Awesome3', tagId: 'awesome3'},
    ]}>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
      <p data-id={"awesome1"} style={{ color: 'black' }}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
      <p data-id={"awesome2"} style={{ color: 'purple' }}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
      <p data-id={"awesome3"} style={{ color: 'red' }}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </p>
    </SmartBox>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
