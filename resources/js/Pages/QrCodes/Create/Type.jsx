import { usePage } from "@inertiajs/react";

export default function Type(props) {
    const { type, setType } = props;

    const { lang } = usePage().props;

    return (
        <>
            <div id="typeLabel" className="label">
                Type
            </div>

            <div className="flex gap-2" aria-labelledby="typeLabel">
                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="type"
                        id="static"
                        className="radio radio-xs"
                        autoComplete="off"
                        value={type}
                        checked={type === 'static'}
                        onChange={() => setType('static')}
                    />

                    <label htmlFor="static">
                        Static
                    </label>
                </div>

                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="type"
                        id="dynamic"
                        className="radio radio-xs"
                        autoComplete="off"
                        checked={type === 'dynamic'}
                        onChange={() => setType('dynamic')}
                    />

                    <label htmlFor="dynamic">
                        Dynamic
                    </label>
                </div>
            </div>
        </>
    );
}
