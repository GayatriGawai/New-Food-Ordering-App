export default function SectionHeader({ subHeader, mainHeader }) {
    return (
        <section className="text-center ">
            <h3 className="uppercase font-semibold leading-4">{subHeader}</h3>
            <h3 className="text-primary font-bold text-3xl mb-5">
                {mainHeader}
            </h3>
        </section>
    );
}
