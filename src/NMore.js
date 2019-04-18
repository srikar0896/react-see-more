import React, { useState, useRef, useEffect } from 'react';
import ArrowDownIcon from './ArrowDownIcon';
import { log } from './utils';

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

const NMore = props => {
  const SmartBoxRef = useRef();
  const [showMoreButton, setVisibility] = useState(true);
  const [nMore, setNMore] = useState(0);

  const handleWheelDown = () => {
    if(showMoreButton){
      setVisibility(false);
    }
  };
  
  const calculateNMore = () => {
    log('Ref', SmartBoxRef);
    if(SmartBoxRef.current){
      const totalChildren = SmartBoxRef.current.childElementCount;
      const children = SmartBoxRef.current.children;
      let inViewportChildrenCount = 0;
      let foundOutsideViewportChild = false;
      Object.keys(children).forEach(childIndex => {
        if(isElementInViewPort(children[childIndex]) && !foundOutsideViewportChild){
          log('In Viewport', children[childIndex]);
          inViewportChildrenCount++;
        } else {
          log('Outside Viewport', children[childIndex]);
          foundOutsideViewportChild = true;
        }
      });
      setNMore(totalChildren - inViewportChildrenCount);
    }
  };

  useEffect(() => {
    calculateNMore();
    SmartBoxRef.current.addEventListener("scroll", () => {
      // handleWheelDown();
      calculateNMore();
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
        {props.children}
      </div>
      {
        showMoreButton && nMore > 0 && (
          <div className="seeMoreWrapper">
            <div className="seeMore">
              <ArrowDownIcon className="downArrowIcon"/>
              {`${nMore} more`}
            </div>
          </div>
        )
      }
    </>
  )
};

export default NMore;
