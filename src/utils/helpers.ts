export const getArrayByNumber = (max: number) => {
  let num = 0;
  const result: string[] = [];
  while (num !== max) {
    num++;
    result.push(String(num));
  }
  return result;
};
