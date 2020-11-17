export const sortData = (data) => {
  const sortedData = [...data];
  // eslint-disable-next-line array-callback-return
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  // return sortedData;
  //  above can be written like this
  // sortedData.sort((a, b) => a.cases < b.cases);
  return sortedData;
};
