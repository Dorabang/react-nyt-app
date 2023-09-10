import axios from 'libs/axios';

type DataType = any;

export const getPost = async (
  query?: string,
  period?: string,
  glocations?: string[]
): Promise<DataType> => {
  const glocationsFormat = glocations?.map((value) => `"${value}"`);

  const response = await axios.get(
    `?${query || period || glocations ? 'fq=' : ''}${
      query ? `headline:("${query}")` : ''
    }${query && period ? ' AND ' : ''}${
      period ? `pub_date:("${period}")` : ''
    }${period && glocations ? ' AND ' : ''}${
      glocations ? `glcations:(${glocationsFormat?.toString()})` : ''
    }${query || period || glocations ? '&' : ''}sort=newest&api-key=${
      process.env.REACT_APP_API_KEY
    }`
  );
  return response.data.response.docs;
};

export const getInfinitePost = async ({
  query,
  period,
  glocations,
  page,
}: {
  query?: string;
  period?: string;
  glocations?: string[];
  page?: any;
}) => {
  const glocationsFormat = glocations?.map((value) => `"${value}"`);

  const response = await axios.get(
    `?${query || period || glocations ? 'fq=' : ''}${
      query ? `headline:("${query}")` : ''
    }${query && period ? ' AND ' : ''}${
      period ? `pub_date:("${period}")` : ''
    }${period && glocations ? ' AND ' : ''}${
      glocations && glocations?.length > 0
        ? `glcations:(${glocationsFormat?.toString()})`
        : ''
    }${
      query || period || glocations ? '&' : ''
    }page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`
  );
  return response.data.response.docs;
};
