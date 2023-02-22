const isUpper = (char: string) => {
  let code = char.charCodeAt(0);
  return code > 64 && code <= 90;
};
const isLower = (char: string) => {
  let code = char.charCodeAt(0);
  return code > 96 && code <= 122;
};
export default function atbash(string: string): string {
  let chunk = '';
  for (const char of string) {
    if (isUpper(char)) {
      chunk = chunk.concat(String.fromCharCode(155 - char.charCodeAt(0)));
    } else if (isLower(char)) {
      chunk = chunk.concat(String.fromCharCode(219 - char.charCodeAt(0)));
    } else {
      chunk = chunk.concat(char);
    }
  }
  return chunk;
}
