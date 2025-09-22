import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

import FormWrapper from '../../../Shared/FormWrapper';

export default function UploadData() {
    const { setData, post, processing, errors } = useForm({ sqlFile: null });

    const { lang } = usePage().props;

    const sqlFileRef = useRef();

    function submit(e) {
        e.preventDefault();

        post('/qrcodes/upload-data', {
            preserveScroll: true,

            onFinish: () => {
                setData('sqlFile', null);
                sqlFileRef.current.value = '';
            },
        });
    }

    return (
        <form onSubmit={submit}>
            <FormWrapper title={lang.action.options.backup.text} error={errors.sqlFile}>
                <label className="label" htmlFor="sqlFile">
                    {lang.action.options.chooseFile.text}
                </label>

                <div className="flex gap-2">
                    <input
                        type="file"
                        id="sqlFile"
                        className="file-input"
                        autoComplete="off"
                        ref={sqlFileRef}
                        onChange={e => setData('sqlFile', e.target.files[0])}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary btn-square"
                        aria-label={lang.action.options.uploadFile.text}
                        title={lang.action.options.uploadFile.text}
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={faUpload} />
                    </button>
                </div>
            </FormWrapper>
        </form>
    );
}
