export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}


export function getLogger(name: string) {
  const style = "color: white;background: green;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px";
  const log = (...m) => console.log(`%c${name}`, style, ...m)
  return log
}

