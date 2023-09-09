import FilterOptions, { FilterOptionsProps } from 'constants/FilterOptions';
import DateFormat from 'libs/DateFormat';
import { filterProps } from './FilterModal';
import CountryOptionList from './CountryOptionList';
import getFilter from 'libs/getFilter';

const Filter = ({
  currentPage,
  setModalOpen,
}: {
  currentPage: 'Home' | 'Scrape';
  setModalOpen: (e: boolean) => void;
}) => {
  const filter: filterProps | null | undefined = getFilter(currentPage);

  const country =
    filter?.glocations && filter?.glocations.length !== 0
      ? filter.glocations
      : null;

  const printCountryValue = (option: FilterOptionsProps) => {
    let value;

    if (filter) {
      if (filter?.q && option.name === '전체 헤드라인') {
        value =
          filter?.q.length > 10
            ? filter?.q.substring(0, 10) + '...'
            : filter?.q;
        return value;
      }

      if (filter?.period && option.name === '전체 날짜') {
        value = DateFormat(filter.period).substring(0, 10);
        return value;
      }

      if (country && option.name === '전체 국가') {
        const firstValue = CountryOptionList.find(
          (item) => item.name === country[0]
        );
        value = `${firstValue?.desc}${
          country.length > 1 ? ` 외 ${country.length - 1}개` : ''
        }`;
        return value;
      }
    }
    value = option.name;
    return value;
  };

  return (
    <div className='w-full h-[60px] pl-5 py-[13px] flex'>
      <div className='w-full h-[34px] flex gap-[7px] overflow-x-scroll scrollbar-hide'>
        {FilterOptions.map((option) => (
          <div
            key={option.id}
            className={`rounded-full border flex items-center px-3 cursor-pointer
            border-gray-font
            ${
              filter?.q && option.name === '전체 헤드라인'
                ? 'border-sub-blue'
                : ''
            }
            ${
              filter?.period && option.name === '전체 날짜'
                ? 'border-sub-blue'
                : ''
            }
            ${country && option.name === '전체 국가' ? 'border-sub-blue' : ''}
            `}
            onClick={() => setModalOpen(true)}
          >
            {option.icon && (
              <div className='w-4 h-4 mr-1'>
                {option.name === '전체 헤드라인' ? (
                  <img
                    src={filter && filter?.q ? option.activeIcon : option.icon}
                    alt={`${option.name} 아이콘`}
                    className='w-full object-cover'
                  />
                ) : (
                  <img
                    src={
                      filter && filter?.period ? option.activeIcon : option.icon
                    }
                    alt={`${option.name} 아이콘`}
                    className='w-full object-cover'
                  />
                )}
              </div>
            )}
            <p
              className={`text-black-80 text-sm tracking-[-0.08em] leading-6
              ${
                filter?.q && option.name === '전체 헤드라인'
                  ? 'text-main-blue'
                  : ''
              }
              ${
                filter?.period && option.name === '전체 날짜'
                  ? 'text-main-blue'
                  : ''
              }
              ${country && option.name === '전체 국가' ? 'text-main-blue' : ''}
                `}
            >
              {printCountryValue(option)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
