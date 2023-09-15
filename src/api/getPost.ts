import { filterProps } from 'components/FilterModal';
import axios from 'libs/axios';
import getAPIURL from 'libs/getAPIURL';
import getFilter from 'libs/getFilter';

export const getDefaultPost = async (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const url = `?page=${page}&sort=newest&api-key=${process.env.REACT_APP_API_KEY}`;

  const response = await axios.get(`${url}`);

  return response.data.response;
};

export const getFilteredPost = async (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const filter: filterProps | null | undefined = getFilter(currentPage);
  const url = getAPIURL(filter?.q, filter?.period, filter?.glocations, page);

  const response = await axios.get(`${url}`);

  return response.data.response;
};
