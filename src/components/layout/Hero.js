'use client';
import Right from '../Icons/Right';

export default function Hero() {
    function handleOrderNow(e) {
        console.log(
            'Order Now is pressed please implement the functionality in layout/Hero.js'
        );
    }
    function handleLearnMore() {
        console.log(
            'Learn More is pressed please implement the functionality in layout/Hero.js'
        );
    }
    return (
        <section className="hero whitePaper mb-8 max-w-4xl mt-4 ">
            <div className="py-12 ">
                <h1 className="text-4xl">
                    Where Every Sip Tells a{' '}
                    <span className="font-semibold">Story...</span>
                </h1>
                <p className="my-4 font-semibold indent-16">
                    Welcome to OUT<sub>(Once Upon a Time)</sub>, a cozy haven
                    where every cup of coffee is the beginning of a new story.
                    Nestled in the heart of the city, our cafe combines the
                    charm of a timeless fairy tale with the comfort of your
                    favorite nook. Whether you’re indulging in a freshly brewed
                    latte or savoring one of our homemade pastries, each visit
                    promises a unique experience, filled with warmth and wonder.
                    At OUT, we believe that every sip should be savored, every
                    moment cherished, and every story shared. Join us, and let
                    your story begin here.
                </p>
                <div className="flex gap-4 text-sm">
                    <button
                        className="hover:text-white hover:shadow-black/25 hover:shadow-md transition-all bg-primary uppercase flex items-center rounded-full gap-2 py-2 px-4"
                        onClick={(e) => handleOrderNow()}
                    >
                        Order now
                        <Right />
                    </button>
                    <button
                        className="text-gray-700 hover:shadow-md transition-all flex justify-center gap-2 py-2 border-0 items-center font-semibold"
                        onClick={handleLearnMore}
                    >
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
        </section>
    );
}
