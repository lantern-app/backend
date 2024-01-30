const stringInRange = (inputString: string): boolean => {
  // validate if the string is a comma separated list of numbers in the range 1-99
  const pattern = /^(0*[1-9]|[1-9][0-9])(,(0*[1-9]|[1-9][0-9]))*$/;
  return pattern.test(inputString);
};

export { stringInRange };
