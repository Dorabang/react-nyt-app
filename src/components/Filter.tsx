import FilterOptions from 'constants/FilterOptions';

const Filter = () => {
  return (
    <div className='w-full h-[60px] overflow-x-clip pl-5 py-[13px] flex'>
      <div className='w-full flex gap-[7px]'>
        {FilterOptions.map((option) => (
          <div
            key={option.id}
            className='rounded-full border border-gray-font flex items-center px-3 cursor-pointer'
          >
            {option.icon && (
              <div className='w-4 h-4 mr-1'>
                <img src={option.icon} alt='' className='w-full object-cover' />
              </div>
            )}
            <p className={`text-black-80 text-sm leading-6 tracking-tight`}>
              {option.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
