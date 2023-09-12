import React, { useEffect, useRef, useState } from 'react';
import Header from 'components/Header';
import StatusBar from 'assets/Status_Bar.png';
import Filter from 'components/Filter';
import FilterModal from 'components/FilterModal';
import useOnClickOutside from 'hooks/useOnClickOutside';
import ToastProvider from 'components/ToastProvider';
import Post from 'components/Post';
import { setItem } from 'libs/getStorageData';

function App() {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Scrape'>('Home');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const handleChangePage = (value: string) => {
    setCurrentPage(() => (value === '홈' ? 'Home' : 'Scrape'));
  };

  useEffect(() => {
    /* routing */
    setItem('page', currentPage);
  }, [currentPage]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[375px] h-[812px] rounded-[30px] shadow-2xl overflow-hidden relative flex flex-col'>
        <div>
          <img src={StatusBar} alt='스마트폰 스테이터스 바 이미지' />
        </div>
        <ToastProvider />
        {modalOpen && (
          <div className='absolute z-10 w-full h-full flex justify-center items-center bg-black/50 px-5'>
            <div ref={ref}>
              <FilterModal
                currentPage={currentPage}
                setModalOpen={(e) => setModalOpen(e)}
              />
            </div>
          </div>
        )}
        <Filter
          currentPage={currentPage}
          setModalOpen={(e) => setModalOpen(e)}
        />
        <Post currentPage={currentPage} handleChangePage={handleChangePage} />
        <Header handleChangePage={handleChangePage} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;
