import uuid from 'react-uuid';
import { useState } from 'react';

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
  const [checkedId, setCheckedId] = useState<string[]>([]);

  const onChange = (e: React.FormEvent<HTMLLabelElement>, id: string) => {
    const target = e.target as HTMLInputElement;

    if (!target.checked) {
      const updatedChecked = checkedId.filter((item) => item !== id);
      setCheckedId(updatedChecked);
    } else setCheckedId([...checkedId, id]);
  };

  return (
    <>
      {CountryOptionList.map(({ id, name, desc }) => (
        <label
          key={id}
          onChange={(e) => onChange(e, id)}
          htmlFor={name}
          className={`
        relative px-3 py-2
        border border-white-60 rounded-full
        text-sm
        ${checkedId.includes(id) ? 'bg-sub-blue' : ''}
        `}
        >
          <span
            className={`relative z-10 ${
              checkedId.includes(id) ? 'text-white' : 'text-black-80'
            }`}
          >
            {desc}
          </span>
          <input
            type='checkbox'
            id={name}
            className={`appearance-none outline-none rounded-full
            absolute left-0 top-0 z-10 cursor-pointer
            w-full h-full
            `}
          />
        </label>
      ))}
    </>
  );
};
export default CountryOptionList;
