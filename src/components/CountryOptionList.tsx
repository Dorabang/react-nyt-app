import uuid from 'react-uuid';

const CountryOptionList = [
  { id: uuid(), name: 'KOREA', desc: '대한민국' },
  { id: uuid(), name: 'CHINA', desc: '중국' },
  { id: uuid(), name: 'JAPAN', desc: '일본' },
  { id: uuid(), name: 'USA', desc: '미국' },
  { id: uuid(), name: 'NORTHKOREA', desc: '북한' },
  { id: uuid(), name: 'RUSSIA', desc: '러시아' },
  { id: uuid(), name: 'FRANCE', desc: '프랑스' },
  { id: uuid(), name: 'UK', desc: '영국' },
];

export const CountryOption = () => {
  return (
    <>
      {CountryOptionList.map(({ id, name, desc }) => (
        <label
          key={id}
          htmlFor={name}
          className='relative px-3 py-2
        border border-white-60 rounded-full cursor-pointer text-sm
        text-black-80 checked:text-white'
        >
          <span className='relative z-10'>{desc}</span>
          <input
            type='checkbox'
            id={name}
            className='appearance-none outline-none rounded-full absolute left-0 top-0 w-full h-full checked:bg-sub-blue'
          />
        </label>
      ))}
    </>
  );
};
export default CountryOptionList;
