import Error from './Error';

export default function FormWrapper(props) {
    const { error, title, children } = props;

    return (
        <fieldset className="fieldset text-sm bg-base-200 border-gray-300 rounded-box
            border p-4"
        >
            {error ? <Error msg={error} /> : ''}

            <legend className="fieldset-legend">{title}</legend>

            {children}
        </fieldset>
    );
}
