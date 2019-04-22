import React, { useRef, useEffect, useState } from 'react';
import ArrowDownIcon from '../ArrowDownIcon';
import { isElementInViewPort, log } from '../utils';

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

export default SmartBox;
