export default function Title1(props) {
    const { children } = props;

    return (
        <>
            <h1 className="text-center text-3xl mt-8">{children}</h1>

            <hr className="border-0 border-b-2 border-gray-300 mt-3 mb-8" />
        </>
    );
}
