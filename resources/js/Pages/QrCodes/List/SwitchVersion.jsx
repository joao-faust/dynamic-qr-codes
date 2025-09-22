import { useForm, usePage } from '@inertiajs/react';

import FormWrapper from '../../../Shared/FormWrapper';

export default function SwitchVersion(props) {
    const { id, destinations, enabledDestination } = props;

    const { data, setData, post } = useForm({ versionId: enabledDestination.version_id });

    const { lang } = usePage().props;

    const versions = destinations.map((destination, index) => {
        const isEnabledDestination =
            destination.version_id === enabledDestination.version_id;

        return (
            <option
                value={destination.version_id}
                title={destination.content}
                disabled={isEnabledDestination}
                key={index}
            >
                {isEnabledDestination
                    ? `${lang.meta.version.text} ${index + 1} (${lang.meta.current.text})`
                    : `${lang.meta.version.text} ${index + 1}`}
            </option>
        );
    });

    function submit(e) {
        e.preventDefault();

        post(`/qrcodes/${id}/switch-version`, { preserveScroll: true });
    }

    return (
        <form onSubmit={submit}>
            <FormWrapper title={lang.meta.version.text}>
                <label htmlFor="version" className="label">
                    {lang.form.fields.value.text}
                </label>
                <select
                    id="version"
                    className="select w-full"
                    autoComplete="off"
                    value={data.versionId}
                    onChange={e => setData('versionId', e.target.value)}
                >
                    {versions}
                </select>

                <button className="btn btn-primary mt-2">
                    {lang.action.options.switch.text}
                </button>
            </FormWrapper>
        </form>
    );
}
