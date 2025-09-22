import { usePage } from "@inertiajs/react";

export default function Visibility(props) {
    const { visibility, setVisibility } = props;

    const { lang } = usePage().props;

    return (
        <>
            <div id="visibilityLabel" className="label">
                {lang.form.fields.visibility.text}
            </div>

            <div className="flex gap-2" aria-labelledby="visibilityLabel">
                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="visibility"
                        id="public"
                        className="radio radio-xs"
                        autoComplete="off"
                        value={visibility}
                        checked={visibility === 'public'}
                        onChange={() => setVisibility('public')}
                    />

                    <label htmlFor="public">
                        {lang.form.fields.visibility.options.public.text}
                    </label>
                </div>

                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="visibility"
                        id="private"
                        className="radio radio-xs"
                        autoComplete="off"
                        value={visibility}
                        checked={visibility === 'private'}
                        onChange={() => setVisibility('private')}
                    />

                    <label htmlFor="private">
                        {lang.form.fields.visibility.options.private.text}
                    </label>
                </div>
            </div>
        </>
    );
}
