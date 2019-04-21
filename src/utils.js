const logTitleColor = 'Green';
const logEnabled = false;

export const isElementInViewPort = element => {
  const elementTop = element.getBoundingClientRect().top;
  const parentTop = element.parentElement.getBoundingClientRect().top;
  const parentHeight = element.parentElement.getBoundingClientRect().height;
  return elementTop <= (parentTop + parentHeight);
};

export const log = (title, ...message) => {
  if(logEnabled){
    console.log(
      `%c ${title.toUpperCase().padStart(15)} `,
      `font-weight:bold;background-color:${logTitleColor};color: white`, ...message
    );
  }
};
