const logColor = 'Green';

export const log = (title, ...message) => 
console.log(`%c ${title.toUpperCase().padStart(15)} `, `font-weight:bold;background-color:${logColor};color: white`, ...message);;