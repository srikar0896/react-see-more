import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { log, isElementInViewPort } from './utils';
import ArrowDownIcon from './ArrowDownIcon';
import "./styles.css";
import NMore from './NMore';

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
    if(smartTags.length){
      SmartBoxRef.current.childNodes.forEach(child => {
        if (
          child.attributes["data-id"] &&
          child.attributes["data-id"].nodeValue === smartTags[0].tagId
        ) {
          const targetElement = child;
          if (isElementInViewPort(child)) {
            log("In viewport");
            const tags = smartTags;
            tags.splice(0,1);
            setVisibility(false);
            setSmartTags(tags);
          } else {
            setVisibility(true);
            log("Not in viewport");
          }
        }
      });
    }  
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
  }, []);

  return (
    <>
      <div ref={SmartBoxRef} {...props}>
        <h2>Hello CodeSandbox</h2>
        <h3>Start editing to see some magic happen!</h3>
        <h2>Hello CodeSandbox</h2>
        <h3>Start editing to see some magic happen!</h3>
        {props.children}
      </div>
      {
        showMoreButton && (
          <div className="seeMoreWrapper">
            <div className="seeMore" onClick={() => moveToElementView()}>
              <ArrowDownIcon className="downArrowIcon"/>
              {smartTags[0].tagLabel}
            </div>
          </div>
        )
      }
    </>
  );
};

function App() {
  return (
    <div>
    <h1>Discover</h1>
    <SmartBox className="box" tags={[
      { tagLabel: 'More Files', tagId: 'awesome1'},
      { tagLabel: 'Careers', tagId: 'awesome2'},
      { tagLabel: 'Contact', tagId: 'awesome3'},
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
    <h1>NMore</h1>
    <NMore className="box">
      <p>Message1</p>
      <p>Message2</p>
      <p>Message3</p>
      <p>Message4</p>
      <p>Message5</p>
      <p>Message6</p>
      <p>Message7</p>
      <p>Message8</p>
      <p>Message9</p>
      <p>Message10</p>
    </NMore>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
