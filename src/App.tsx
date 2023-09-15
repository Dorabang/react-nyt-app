import React, { useEffect, useRef, useState } from 'react';
import Header from 'components/Header';
import StatusBar from 'assets/Status_Bar.png';
import Filter from 'components/Filter';
import FilterModal, { filterProps } from 'components/FilterModal';
import useOnClickOutside from 'hooks/useOnClickOutside';
import ToastProvider from 'components/ToastProvider';
import { setItem } from 'libs/getStorageData';
import { useRecoilState } from 'recoil';
import { currentPageState } from 'recoil/atom';
import FilteredPost from 'components/FilteredPost';
import DefaultPost from 'components/DefaultPost';
import getFilter from 'libs/getFilter';

function App() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const filter: filterProps | null | undefined = getFilter(currentPage);

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
  }, [currentPage, filter]);

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

        {!filter?.q && !filter?.period && filter?.glocations?.length === 0 ? (
          <DefaultPost />
        ) : (
          <FilteredPost />
        )}
        <Header handleChangePage={handleChangePage} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default App;
