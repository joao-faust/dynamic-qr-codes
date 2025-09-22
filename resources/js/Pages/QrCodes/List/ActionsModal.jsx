import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

import FormWrapper from '../../../Shared/FormWrapper';
import DownloadImage from './DownloadImage';
import Modal from '../../../Shared/Modal';
import SwitchVersion from './SwitchVersion';

export default function ActionsModal(props) {
    const { qrCode } = props;

    const { lang } = usePage().props;

    const [action, setAction] = useState('visits');
    const [showDownloadImageArea, setShowDownloadImageArea] = useState(false);
    const [showSwitchVersionArea, setShowSwitchVersionArea] = useState(false);
    const [confirmBtn, setConfirmBtn] = useState(false);

    function submit(e) {
        e.preventDefault();

        setShowDownloadImageArea(false);
        setShowSwitchVersionArea(false);

        const actions = {
            visits: () => router.get(`/qrcodes/${qrCode.id}/visits`),

            downloadData: () => {
                window.location.href = `/qrcodes/${qrCode.id}/download-data`;
            },

            delete: () => {
                router.post(`/qrcodes/${qrCode.id}/delete`, {}, {
                    preserveScroll: true,

                    onBefore: () => {
                        return confirm(lang.qrCode.deleteConfirmation.text);
                    },

                    onSuccess: () => router.get('/', {}, { preserveScroll: true })
                });
            },
        };

        const func = actions[action];

        if (!func) return;

        func();
    }

    function reset() {
        setAction('visits');
        setConfirmBtn(false);
        setShowDownloadImageArea(false);
        setShowSwitchVersionArea(false);
    }

    function handleAction(e) {
        const value = e.target.value;

        setAction(value);
        setConfirmBtn(true);

        if (value === 'downloadImage') {
            setShowSwitchVersionArea(false);
            setShowDownloadImageArea(true);
            return;
        }

        if (value === 'switchVersion') {
            setShowDownloadImageArea(false);
            setShowSwitchVersionArea(true);
            return;
        }

        setShowDownloadImageArea(false);
        setShowSwitchVersionArea(false);

        setConfirmBtn(false);
    }

    return (
        <Modal
            id={`actionsModal${qrCode.id}`}
            title={lang.action.options.execute.text}
            reset={reset}
        >
            <form onSubmit={submit}>
                <FormWrapper title={lang.action.text}>
                    <label htmlFor={`actions${qrCode.id}`} className="label">
                        {lang.form.fields.value.text}
                    </label>
                    <select
                        id={`actions${qrCode.id}`}
                        className="select w-full"
                        autoComplete="off"
                        value={action}
                        onChange={handleAction}
                    >
                        <option value="visits">
                            {lang.visit.plural}
                        </option>

                        <option value="downloadImage">
                            {`
                                ${lang.action.options.download.text}
                                ${lang.form.fields.image.text}`
                            }
                        </option>

                        <option value="downloadData">
                            {`
                                ${lang.action.options.download.text}
                                ${lang.meta.data.text}`
                            }
                        </option>

                        <option value="switchVersion">
                            {lang.action.options.switchVersion.text}
                        </option>

                        <option value="delete">
                            {lang.action.options.delete.text}
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={confirmBtn}
                    >
                        {lang.action.options.confirm.text}
                    </button>
                </FormWrapper>
            </form>

            {showDownloadImageArea ? <DownloadImage id={qrCode.id} /> : ''}

            {showSwitchVersionArea ?
                <SwitchVersion
                    id={qrCode.id}
                    destinations={qrCode.destinations}
                    enabledDestination={qrCode.enabled_destination}
                />
            : ''}
        </Modal>
    );
}
