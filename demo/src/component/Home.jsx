import React, { useEffect, useState } from 'react';

const Home = () => {
    const [userValue, setUserValue] = useState('anime');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); // Page state for pagination
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${userValue}&page=${page}&client_id=n2uIubOI1XjzFM6hpK56ETw-H1_AYonlu2BHR3LifGs`
            );
            const result = await res.json();
            console.log(result);
            
            // Ensure result and result.results are valid
            if (result && Array.isArray(result.results)) {
                setData(prevData => [...prevData, ...result.results]); // Append new data
            } else {
                console.error('Unexpected API response format', result);
            }
    
            setLoading(false); // End loading
        } catch (error) {
            console.error(error);
            setLoading(false); // End loading even if there is an error
        }
    };
    
    useEffect(() => {
        fetchData(); // Fetch images on component mount and when `page` changes
  
          if (userValue === '') {
              setUserValue('random')
          }

    }, [userValue, page]);

    useEffect(() => {
        setData([]); // Reset data when userValue changes
        setPage(1); // Reset to the first page when searching for a new query
    }, [userValue]);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !loading
        ) {
            setPage(prevPage => prevPage + 1); // Increase page count when user scrolls near bottom
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup event listener
    }, [loading]); // Re-run the effect only when loading state changes

    const handleDownload = (url, filename) => {
        const link = document.createElement('a'); // Create an anchor element
        link.href = url; // Set the href to the image URL
        link.download = filename; // Set the download attribute with the desired file name
        document.body.appendChild(link); // Append the link to the DOM
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the DOM
    };

    return (
        <div>
            {/* Input field to search for images */}
            <form className="max-w-md mx-auto my-24" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
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
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>

            {/* Display fetched images */}
            <div className="flex flex-wrap gap-4 p-6">
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="w-full md:w-1/3 lg:w-[23%] h-[300px] flex flex-col">

                            <img
                                className="w-full h-full object-cover"
                                src={item.urls.regular}
                                alt={item.alt_description}
                            />
                            {/* Programmatic download on button click */}
                            <button
                                onClick={() => handleDownload(item.urls.full, `image-${index}.jpg`)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center mt-2"
                            >
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                </svg>
                                <span>Download</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No images found</p>
                )}
            </div>

            {/* Loading indicator */}
            {loading &&
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
};

export default Home;
