const getAPIURL = (
  query?: string,
  period?: string,
  glocations?: string[],
  page: number = 0
) => {
  const glocationsFormat =
    glocations && glocations?.map((value) => `"${value}"`);

  const url = `?${query || period || glocationsFormat ? 'fq=' : ''}${
    query ? `headline:("${query}")` : ''
  }${query && period ? ' AND ' : ''}${period ? `pub_date:("${period}")` : ''}${
    period && glocations?.length !== 0 ? ' AND ' : ''
  }${glocationsFormat ? `glcations:(${glocationsFormat?.toString()})` : ''}${
    query || period || glocations ? '&' : ''
  }page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`;
  return url;
};

export default getAPIURL;
