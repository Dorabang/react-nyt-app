import { filterProps } from 'components/FilterModal';

/**
 * 로컬스토리지에 저장된 필터 값을 리턴하는 함수입니다.
 * - 현재 페이지를 확인한 후, 페이지에 맞는 필터 값을 리턴합니다.
 *
 * @param currentPage 현재페이지에 맞는 필터값 로컬스토리지에서 받아오기
 *
 * @return 로컬스토리지에 저장된 현재 페이지의 filter 값
 */

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
