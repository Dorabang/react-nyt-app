import axios from 'libs/axios';

type DataType = any;

export const getPost = async (q: string, fq?: string): Promise<DataType[]> => {
  const response = await axios.get(
    `?${q ? `q=${q}&` : ''}${fq ? `fq=${fq}&` : ''}api-key=${
      process.env.REACT_APP_API_KEY
    }`
  );
  return response.data.response.docs;
};
