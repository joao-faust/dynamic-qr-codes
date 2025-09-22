import { usePage } from "@inertiajs/react";

export default function Status(props) {
    const { status, setStatus } = props;

    const { lang } = usePage().props;

    return (
        <>
            <div id="statusLabel" className="label">{lang.form.fields.status.text}</div>

            <div className="flex gap-2" aria-labelledby="statusLabel">
                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="status"
                        id="enabled"
                        className="radio radio-xs"
                        value={status}
                        autoComplete="off"
                        checked={status === 'enabled'}
                        onChange={() => setStatus('enabled')}
                    />
                    <label htmlFor="enabled">
                        {lang.form.fields.status.options.enabled.text}
                    </label>
                </div>

                <div className="flex gap-1">
                    <input
                        type="radio"
                        name="status"
                        id="disabled"
                        className="radio radio-xs"
                        value={status}
                        autoComplete="off"
                        checked={status === 'disabled'}
                        onChange={() => setStatus('disabled')}
                    />
                    <label htmlFor="disabled">
                        {lang.form.fields.status.options.disabled.text}
                    </label>
                </div>
            </div>
        </>
    );
}
