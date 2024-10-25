import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const [userValue, setUserValue] = useState('anime');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useSelector((store) => store.user);

    console.log(currentUser);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${userValue}&page=${page}&client_id=n2uIubOI1XjzFM6hpK56ETw-H1_AYonlu2BHR3LifGs`
            );
            const result = await res.json();
            console.log(result);

            if (result && Array.isArray(result.results)) {
                setData((prevData) => [...prevData, ...result.results]);
            } else {
                console.error('Unexpected API response format', result);
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        if (userValue === '') {
            setUserValue('random');
        }
    }, [userValue, page]);

    useEffect(() => {
        setData([]);
        setPage(1);
    }, [userValue]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const handleOpenInNewTab = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div>
            {/* Input field to search for images */}
            <form className="max-w-md mx-auto my-24 p-3" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        onChange={(e) => setUserValue(e.target.value)}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        required
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Search </button>
                </div>
            </form>

            {/* Display fetched images */}
            <div className="flex flex-wrap gap-4 p-6">
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-full md:w-1/3 lg:w-[23%] h-[300px] flex flex-col relative group hover:shadow-lg hover:shadow-gray-400"
                        >
                            {/* Image with open in new tab handler */}
                            <button
                                onClick={() => handleOpenInNewTab(item.urls.regular)}
                                className="w-full h-full relative group"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={item.urls.regular}
                                    alt={item.alt_description}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                    <span className="text-white font-semibold text-lg">Click to open in new tab</span>
                                </div>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No images found</p>
                )}
            </div>

            {/* Loading indicator */}
            {loading && (
                <div role="status" className="flex flex-col items-center justify-center">
                    {/* Loading spinner code */}
                </div>
            )}
        </div>
    );
};

export default Home;
