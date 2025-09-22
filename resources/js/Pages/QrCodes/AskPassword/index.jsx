import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import FormWrapper from '../../../Shared/FormWrapper';
import Title1 from '../../../Shared/Title1';
import Title2 from '../../../Shared/Title2';
import CsrfTokenInput from '../../../Shared/CsrfTokenInput';

export default function AskPassword({ qrCode }) {
    const { lang, errors } = usePage().props;

    const [password, setPassword] = useState('');

    const queryParam = new URLSearchParams(window.location.search);

    const visit = !queryParam.get('visit')
        ? 'yes'
        : queryParam.get('visit');

    return (
        <div className="max-w-sm m-auto">
            <Head title="Private Qr Code" />

            <Title1>{lang.qrCode.accessPrivate.text}</Title1>
            <Title2>{lang.form.enterRequestedData.text}</Title2>

            <form
                action={`/qrcodes/${qrCode.id}/private-destination?visit=${visit}`}
                method="post"
            >
                <CsrfTokenInput />

                <FormWrapper error={errors.password}>
                    <label htmlFor="password" className="label">
                        {lang.auth.form.fields.password.text}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.password.subText}
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary btn-block mt-2">
                        {lang.action.options.access.text}
                    </button>
                </FormWrapper>
            </form>
        </div>
    );
}
