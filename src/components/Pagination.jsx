// eslint-disable-next-line react/prop-types
export default function Pagination({ currentPage, totalPages, setCurrentPage }) {


    return (
        <div className="flex justify-center my-4">
            {console.log("totalPages: " + totalPages)}
            <div className="inline-flex items-center justify-center rounded-sm bg-blue-600 py-1 text-white">
                <button className="inline-flex size-12 items-center justify-center rtl:rotate-180 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>


                <span className="h-4 w-px bg-white/25" aria-hidden="true"></span>

                <div>

                    <button
                        className="h-8 w-12 rounded-sm border-none bg-transparent p-0 text-center text-sm font-bold [-moz-appearance:_textfield] focus:ring-white focus:outline-hidden focus:ring-inset [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none cursor-text"
                        id="PaginationPage"
                    >{currentPage}</button>
                </div>

                <span className="h-4 w-px bg-white/25"></span>
                <button className="inline-flex size-12 items-center justify-center rtl:rotate-180 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>

                </button>

            </div>
        </div>
    )

}