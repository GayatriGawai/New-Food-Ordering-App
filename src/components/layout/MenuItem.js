export default function MenuItem() {
    return (
        <div className="bg-gray-200 text-center p-4 rounded-lg hover:bg-white hover:shadow-black/25 hover:shadow-md transition-all">
            <div className="text-center">
                <img
                    src="/pizza.png"
                    alt="pizza"
                    className="max-h-24 mx-auto max-h-auto block text-center "
                />
            </div>
            <h2 className="font-semibold text-xl my-3">Pepporani Pizza</h2>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="hover:shadow-black/25 hover:shadow-md w-full transition-all mt-4 bg-primary text-white rounded-full px-8 py-2">
                {' '}
                Add to cart $12
            </button>
        </div>
    );
}
