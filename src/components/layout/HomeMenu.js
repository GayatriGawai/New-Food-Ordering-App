import Image from 'next/image';
import MenuItem from './MenuItem';
import SectionHeader from './SectionHeader';

export default function HomeMenu() {
    return (
        <section className="max-w-4xl whitePaper">
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
