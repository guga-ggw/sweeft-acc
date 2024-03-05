import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const PopularImages = ({ query } : {query : any}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images'],
    queryFn: () =>
      fetch(`https://api.unsplash.com/photos/?per_page=20&page=4&order_by=popular&client_id=UADwZ0jykzvKArb5OjGtNAj5r1GbTg5xWcbrAvm9FR0`).then((res) => {
        return res.json();
      }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <div className='flex justify-center items-center  flex-wrap w-full gap-y-12'>
        {query.length > 0 ? query?.map((photo: any) => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className='w-[450px] h-96 m-auto' />
        )) : 
        data?.map((photo: any) => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className='w-[450px] h-96 m-auto' />
        ))}
      </div>
    </div>
  );
};

const MainPage = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [page, setpage] = useState(1)
  
    const filterinput = useRef<HTMLInputElement>(null);
  
    const filter = () => {
      const searchQuery = filterinput.current?.value;
      fetch(`https://api.unsplash.com/search/photos/?per_page=20&page=${page}&order_by=popular&query=${searchQuery}&client_id=UADwZ0jykzvKArb5OjGtNAj5r1GbTg5xWcbrAvm9FR0`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFilteredData(data.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
    useEffect(() => {
    //   if (filterinput.current?.value) {
    //     filter();
    //   }
    console.log(filteredData)
    }, [filteredData]);
  
    return (
      <div className='w-full h-fit items-center justify-center flex flex-col py-9 px-2'>
        <input ref={filterinput} onChange={() => filter()} className='w-80 h-14 shadow-black shadow-md border-none outline-none rounded-lg px-2' type="text" />
        {/* Pass the correct prop to the PopularImages component */}
        <PopularImages query={filteredData} />
        <button className='w-96 h-20 bg-gray-700 color-white' onClick={async() => setpage(prev => prev+1)}>Load more images</button>
      </div>
    );
  };
  
  export default MainPage;