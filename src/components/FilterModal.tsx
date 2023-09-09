import React, { useState } from 'react';
import dateIcon from 'assets/inactive/date_gray.png';
import DateFormat from 'libs/DateFormat';
import uuid from 'react-uuid';
import { CountryOption } from './CountryOptionList';

export interface filterProps {
  id: string;
  q?: string;
  period?: string;
  glocations?: string[];
}

const FilterModal = ({
  currentPage,
  setModalOpen,
}: {
  currentPage: 'Home' | 'Scrape';
  setModalOpen: (e: boolean) => void;
}) => {
  const [headline, setHeadline] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState<string[]>([]);

  const handleClick = (
    searchValue: string,
    dateValue: string,
    countryValue: string[]
  ) => {
    const storageKey = currentPage === 'Home' ? 'HomeFilter' : 'ScrapeFilter';

    const filter: filterProps = {
      id: uuid(),
      q: searchValue,
      period: dateValue,
      glocations: countryValue,
    };
    localStorage.setItem(storageKey, JSON.stringify(filter));

    setModalOpen(false);
  };

  const handleChecked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;

    if (country && country.includes(target.id)) {
      const deleteCountry = country.filter((country) => country !== target.id);
      setCountry(deleteCountry);
    } else {
      country && target.checked === true && setCountry([...country, target.id]);
    }
  };

  return (
    <div className='bg-white rounded-lg w-full'>
      <Heading title='헤드라인'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder='검색할 헤드라인을 입력해주세요.'
            className='outline-none border border-gray-font rounded-lg px-5 py-[10px]
            text-sm placeholder:text-gray-font w-full'
          />
        </form>
      </Heading>
      <Heading title='날짜'>
        <form className='relative'>
          <input
            type='date'
            datatype='날짜 선택'
            className='absolute z-[1] w-full outline-none rounded-lg px-5 py-[10px] opacity-0'
            onChange={(e) => setDate(e.target.value)}
          />
          <div className='border border-gray-font rounded-lg px-5 py-[10px] flex justify-between items-center'>
            <p
              className={`${
                date !== '' ? '' : 'text-gray-font'
              } flex-grow text-sm`}
            >
              {date
                ? DateFormat(`${date}`).substring(0, 10)
                : '날짜를 선택해주세요.'}
            </p>
            <div className='w-4 h-4 cursor-pointer'>
              <img
                src={dateIcon}
                alt='데이트피커 아이콘'
                className='w-full object-fit'
              />
            </div>
          </div>
        </form>
      </Heading>
      <Heading title='국가'>
        <form
          className='flex flex-wrap gap-2'
          onChange={(e) => handleChecked(e)}
        >
          <CountryOption />
        </form>
      </Heading>
      <div className='p-5'>
        <input
          type='submit'
          value='필터 적용하기'
          onClick={() => handleClick(headline, date, country)}
          className='w-full py-[18px] text-center text-white rounded-2xl
          bg-main-blue hover:bg-opacity-90 transition-colors
          cursor-pointer'
        />
      </div>
    </div>
  );
};

export const Heading = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='p-5 w-full'>
      <h3 className='font-semibold pb-2'>{title}</h3>
      {children}
    </div>
  );
};

export default FilterModal;
