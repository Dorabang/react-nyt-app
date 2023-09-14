const getAPIURL = (
  query?: string,
  period?: string,
  glocations?: string[],
  page: number = 0
) => {
  const glocationsFormat = glocations?.map((value) => `"${value}"`);

  const url = `?${query || period || glocations?.length !== 0 ? 'fq=' : ''}${
    query ? `headline:("${query}")` : ''
  }${query && period ? ' AND ' : ''}${period ? `pub_date:("${period}")` : ''}${
    period && glocations?.length !== 0 ? ' AND ' : ''
  }${
    glocations?.length !== 0
      ? `glcations:(${glocationsFormat?.toString()})`
      : ''
  }${
    query || period || glocations ? '&' : ''
  }page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`;
  return url;
};

export default getAPIURL;
