import { Head, usePage } from '@inertiajs/react';

import Title1 from '../../../Shared/Title1';
import Title2 from '../../../Shared/Title2';
import Form from './Form';

export default function CreateQrCode(props) {
    const { qrCode } = props;

    const { lang } = usePage().props;

    return (
        <>
            <Head title={qrCode ? lang.qrCode.update.text : lang.qrCode.create.text} />

            <div className="max-w-xl m-auto">
                <Title1>
                    {qrCode ? lang.qrCode.update.text : lang.qrCode.create.text}
                </Title1>
                <Title2>{lang.form.enterRequestedData.text}</Title2>
                <Form qrCode={qrCode} />
            </div>
        </>
    );
}
