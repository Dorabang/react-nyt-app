import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import StatusBar from 'assets/Status_Bar.png';
import Home from 'pages/Home';
import Scrape from 'pages/Scrape';
import Filter from 'components/Filter';

function App() {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Scrape'>('Home');

  const handleChangePage = (value: string) => {
    setCurrentPage(() => (value === '홈' ? 'Home' : 'Scrape'));
  };

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(currentPage));
  }, [currentPage]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[375px] h-[812px] rounded-[30px] shadow-2xl overflow-hidden relative'>
        <div>
          <img src={StatusBar} alt='스마트폰 스테이터스 바 이미지' />
        </div>

        <Filter />
        {currentPage === 'Home' ? <Home /> : <Scrape />}
        <Header handleChangePage={handleChangePage} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;
