const logColor = 'Green';

export const isElementInViewPort = element => {
  const elementTop = element.getBoundingClientRect().top;
  const parentTop = element.parentElement.getBoundingClientRect().top;
  const parentHeight = element.parentElement.getBoundingClientRect().height;
  if(elementTop > (parentTop + parentHeight)){
    return false;
  } else {
    return true;
  }
};

export const log = (title, ...message) => 
console.log(`%c ${title.toUpperCase().padStart(15)} `, `font-weight:bold;background-color:${logColor};color: white`, ...message);;