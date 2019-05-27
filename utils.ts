export function getRandomColor() {
  let r = function() { return Math.floor(Math.random() * 256) };
  return 'rgba(' + r() + ',' + r() + ',' + r() + ', 0.3)';
}

export function colorNumber(value, color) {
  const colored = new Number(value);
  colored['color'] = color;
  return colored;
}

export function colorString(value, color) {
  const colored = new String(value);
  colored['color'] = color;
  return colored;
}