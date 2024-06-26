'use client';
export default function MenuItem() {
    function handleCart() {
        console.log(
            'Add to cart is pressed please implement the functionality in layout/MenuItem.js'
        );
    }

    return (
        <div className="bg-gray-200 text-center p-4 rounded-lg hover:bg-white hover:shadow-black/25 hover:shadow-md transition-all">
            <div className="text-center rounded-full">
                <>Image</>
            </div>
            <h2 className="font-semibold text-xl my-3">Pepporani Pizza</h2>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

     

            <button
                className="hover:shadow-black/25 w-full hover:shadow-md transition-all mt-4 bg-primary rounded-full px-8 py-2"
                onClick={handleCart}
            >

                {' '}
                Add to cart $12
            </button>
        </div>
    );
}
