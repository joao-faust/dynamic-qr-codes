import { usePage } from "@inertiajs/react";

export default function ContentTypes(props) {
    const { contentType, setContentType, } = props;

    const { lang } = usePage().props;

    function getClass(value) {
        return `btn btn-outline ${value === contentType ? 'btn-active' : ''}`;
    }

    return (
        <>
            <div id="contentTypesLabel" className="label">
                {lang.form.fields.contentType.text}
            </div>

            <div
                className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
                aria-labelledby="contentTypesLabel"
            >
                <button
                    type="button"
                    className={getClass('text')}
                    onClick={() => setContentType('text')}
                >
                    {lang.form.fields.type.options.text.text}
                </button>

                <button
                    type="button"
                    className={getClass('url')}
                    onClick={() => setContentType('url')}
                >
                    {lang.form.fields.type.options.url.text}
                </button>

                <button
                    type="button"
                    className={getClass('email')}
                    onClick={() => setContentType('email')}
                >
                    {lang.form.fields.type.options.email.text}
                </button>

                <button
                    type="button"
                    className={getClass('phone')}
                    onClick={() => setContentType('phone')}
                >
                    {lang.form.fields.type.options.phone.text}
                </button>

                <button
                    type="button"
                    className={getClass('whatsapp')}
                    onClick={() => setContentType('whatsapp')}
                >
                    {lang.form.fields.type.options.whatsapp.text}
                </button>
            </div>
        </>
    );
}
