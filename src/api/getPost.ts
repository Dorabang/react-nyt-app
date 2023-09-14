import axios from 'libs/axios';

interface PostDataType {
  _id: string;
  headline: { main: string };
  pub_date: string;
  byline: { original: string; organization: string };
  web_url: string;
}

export const getPost = async (
  query?: string,
  period?: string,
  glocations?: string[],
  page?: number
): Promise<any[]> => {
  const glocationsFormat = glocations?.map((value) => `"${value}"`);

  const response = await axios.get(
    `?${query || period || glocations?.length !== 0 ? 'fq=' : ''}${
      query ? `headline:("${query}")` : ''
    }${query && period ? ' AND ' : ''}${
      period ? `pub_date:("${period}")` : ''
    }${period && glocations?.length !== 0 ? ' AND ' : ''}${
      glocations?.length !== 0
        ? `glcations:(${glocationsFormat?.toString()})`
        : ''
    }${
      query || period || glocations ? '&' : ''
    }page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`
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
  page: number;
}) => {
  const glocationsFormat = glocations?.map((value) => `"${value}"`);

  const response = await axios.get(
    `?${query || period || glocations?.length !== 0 ? 'fq=' : ''}${
      query ? `headline:("${query}")` : ''
    }${query && period ? ' AND ' : ''}${
      period ? `pub_date:("${period}")` : ''
    }${period && glocations?.length !== 0 ? ' AND ' : ''}${
      glocations && glocations?.length !== 0
        ? `glcations:(${glocationsFormat?.toString()})`
        : ''
    }${
      query || period || glocations?.length !== 0 ? '&' : ''
    }page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`
  );

  return response.data.response;
};
