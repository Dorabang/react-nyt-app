import { filterProps } from 'components/FilterModal';
import axios from 'libs/axios';
import getAPIURL from 'libs/getAPIURL';
import getFilter from 'libs/getFilter';

export const getInfinitePost = async (
  currentPage: 'Home' | 'Scrape',
  page: number = 0
) => {
  const filter: filterProps | null | undefined = getFilter(currentPage);
  const url = getAPIURL(filter?.q, filter?.period, filter?.glocations, page);

  const response = await axios.get(`${url}`);

  return response.data.response;
};
