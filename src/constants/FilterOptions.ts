import SearchIcon from 'assets/inactive/Search.png';
import DateIcon from 'assets/inactive/Date.png';
import activeSearchIcon from 'assets/active/activeSearch.png';
import activeDateIcon from 'assets/active/activeDate.png';

export interface FilterOptionsProps {
  id: number;
  name: '전체 헤드라인' | '전체 날짜' | '전체 국가';
  icon?: string;
  activeIcon?: string;
}

const FilterOptions: FilterOptionsProps[] = [
  {
    id: 0,
    name: '전체 헤드라인',
    icon: SearchIcon,
    activeIcon: activeSearchIcon,
  },
  { id: 1, name: '전체 날짜', icon: DateIcon, activeIcon: activeDateIcon },
  { id: 2, name: '전체 국가' },
];

export default FilterOptions;
