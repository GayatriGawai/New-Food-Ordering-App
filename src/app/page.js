import { Fragment } from 'react';

import Hero from '../components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeader from '../components/layout/SectionHeader';

export default function Home() {
    return (
        <Fragment>
            <Hero />
            <HomeMenu />
            <section className="my-16 text-center">
                <SectionHeader
                    subHeader={'Our story'}
                    mainHeader={'About us'}
                />
                <div className="max-w-md text-sm mx-auto text-gray-400 mt-4 flex flex-col gap-4">
                    <p>
                        Integer non dolor euismod, blandit dolor ac, venenatis
                        ex. In hac habitasse platea dictumst. Fusce sit amet
                        felis ex. Ut hendrerit auctor mi, et dignissim felis
                        scelerisque et. Vestibulum ultricies, mauris sit amet
                        euismod malesuada, elit felis convallis velit, in
                        fringilla felis magna et ex.
                    </p>
                    <p>
                        Integer non dolor euismod, blandit dolor ac, venenatis
                        ex. In hac habitasse platea dictumst. Fusce sit amet
                        felis ex. Ut hendrerit auctor mi, et dignissim felis
                        scelerisque et.
                    </p>
                    <p>
                        Integer non dolor euismod, blandit dolor ac, venenatis
                        ex. In hac habitasse platea dictumst.
                    </p>
                </div>
            </section>
            <section className="text-center my-8">
                <SectionHeader
                    subHeader={"Don't hesitate"}
                    mainHeader={'Contact us'}
                />
                <div className="mt-4">
                    <a
                        href="tel:+46 789 456 1320"
                        className="underline text-gray-500"
                    >
                        +46 789 456 1320
                    </a>
                </div>
            </section>
        </Fragment>
    );
}
