import { filterProps } from 'components/FilterModal';

const getFilter = (currentPage: 'Home' | 'Scrape') => {
  const filterValue = localStorage.getItem(
    currentPage === 'Home' ? 'HomeFilter' : 'ScrapeFilter'
  );
  if (!filterValue) return;

  const filter: filterProps | null =
    filterValue !== null ? JSON.parse(filterValue) : null;

  return filter;
};

export default getFilter;
