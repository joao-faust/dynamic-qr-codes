import { useForm, usePage } from '@inertiajs/react';

import ContentTypes from './ContentTypes';
import Destination from './Destination';
import Status from './Status';
import Visibility from './Visibility';
import FormWrapper from '../../../Shared/FormWrapper';

export default function Form(props) {
    const { qrCode } = props;

    const { data, setData, post, processing, errors } = useForm({
        contentType: qrCode?.enabled_destination?.type ?? 'text',
        visibility: qrCode?.visibility ?? 'public',
        status: qrCode?.status ?? 'enabled',
        name: qrCode?.name ?? '',
        content: qrCode?.enabled_destination?.content ?? '',
        subject: qrCode?.enabled_destination?.subject ?? '',
        message: qrCode?.enabled_destination?.message ?? '',
        password: '',
        password_confirmation: '',
    });

    const { lang } = usePage().props;

    function submit(e) {
        e.preventDefault();

        const options = {
            preserveScroll: true,

            onError: () => {
                setData('password', '');
                setData('password_confirmation', '');
            },
        };

        if (qrCode) {
            options.onBefore = () => {
                return confirm(lang.qrCode.editConfirmation.text);
            }
        }

        post(`/qrcodes/${qrCode ? qrCode.id + '/' : ''}create`, options);
    }

    return (
        <form onSubmit={submit} autoComplete="off">
            <FormWrapper
                title={lang.qrCode.text}
                error={errors.name || errors.visibility || errors.status}
            >
                <label htmlFor="name" className="label">
                    {lang.form.fields.name.text}
                </label>
                <input
                    type="text"
                    id="name"
                    className="input w-full"
                    placeholder={lang.form.fields.name.subText}
                    autoComplete="off"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />

                <Visibility
                    visibility={data.visibility}
                    setVisibility={value => setData('visibility', value)}
                />

                <Status
                    status={data.status}
                    setStatus={value => setData('status', value)}
                />
            </FormWrapper>

            <FormWrapper
                title={lang.destination.text}
                error={
                    errors.contentType ||
                    errors.content ||
                    errors.subject ||
                    errors.message ||
                    errors.password
                }
            >
                <ContentTypes
                    contentType={data.contentType}
                    setContentType={value => setData('contentType', value)}
                />

                <Destination
                    content={data.content}
                    setContent={value => setData('content', value)}
                    message={data.message}
                    setMessage={value => setData('message', value)}
                    subject={data.subject}
                    setSubject={value => setData('subject', value)}
                    visibility={data.visibility}
                    setVisibility={value => setData('visibility', value)}
                    password={data.password}
                    setPassword={value => setData('password', value)}
                    passwordConfirmation={data.password_confirmation}
                    setPasswordConfirmation={value => {
                        setData('password_confirmation', value)
                    }}
                    contentType={data.contentType}
                    currentVisibility={qrCode ? qrCode.visibility : ''}
                />
            </FormWrapper>

            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={processing}
                >
                    {!qrCode ?
                        lang.action.options.create.text
                    : lang.action.options.update.text}
                </button>
            </div>
        </form>
    );
}
