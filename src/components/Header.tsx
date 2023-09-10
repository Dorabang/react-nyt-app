import React from 'react';
import HomeIcon from 'assets/active/Home_Icon.png';
import inactiveHomeIcon from 'assets/inactive/inactiveHome_Icon.png';
import ScrapeIcon from 'assets/active/Scrape_Icon.png';
import inactiveScrapeIcon from 'assets/inactive/inactiveScrape_Icon.png';

const Header = ({
  handleChangePage,
  currentPage,
}: {
  handleChangePage: (value: string) => void;
  currentPage: string;
}) => {
  return (
    <div className='rounded-[30px] bg-black absolute z-20 w-full bottom-0 px-20 py-5 flex justify-between'>
      <HeaderIcon
        icon={HomeIcon}
        inactiveIcon={inactiveHomeIcon}
        title='홈'
        selected={currentPage === 'Home'}
        handleChangePage={handleChangePage}
      />
      <HeaderIcon
        icon={ScrapeIcon}
        inactiveIcon={inactiveScrapeIcon}
        title='스크랩'
        selected={currentPage === 'Scrape'}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

const HeaderIcon = ({
  icon,
  inactiveIcon,
  title,
  selected,
  handleChangePage,
}: {
  icon: string;
  inactiveIcon: string;
  title: string;
  selected: boolean;
  handleChangePage: (value: string) => void;
}) => {
  return (
    <div
      className={`flex items-center flex-col
      ${selected ? 'opacity-100' : 'opacity-80'}`}
      onClick={() => handleChangePage(title)}
    >
      <div className='w-6 h-6 flex justify-center items-center mb-[9px]'>
        <img
          src={selected ? icon : inactiveIcon}
          alt={`${title} 버튼 이미지`}
        />
      </div>
      <p
        className={`text-[10px] leading-3 font-semibold text-center
        ${selected ? 'text-white' : 'text-[#6d6d6d]'}`}
      >
        {title}
      </p>
    </div>
  );
};

export default Header;
