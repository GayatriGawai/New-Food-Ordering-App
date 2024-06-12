import Image from 'next/image';
import MenuItem from './MenuItem';
import SectionHeader from './SectionHeader';

export default function HomeMenu() {
    return (
        <section>
            <div className="absolute left-0 right-0 w-full justify-start ">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image
                        src={'/sallad1.png'}
                        width={109}
                        height={189}
                        alt={'sallad'}
                    />
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image
                        src={'/sallad2.png'}
                        width={107}
                        height={195}
                        alt={'sallad'}
                    />
                </div>
            </div>
            <SectionHeader subHeader={'checkout'} mainHeader={'Menu'} />
            {/*<div class="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4"> */}
            <div class="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}
