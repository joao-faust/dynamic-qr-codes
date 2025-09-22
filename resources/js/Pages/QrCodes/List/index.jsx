import { Head, usePage } from '@inertiajs/react';

import Data from './Data';
import Title1 from '../../../Shared/Title1';
import Paginator from '../../../Shared/Paginator';
import Filter from './Filter';
import UploadData from './UploadData';

export default function QrCodes(props) {
    const { page, filters } = props;

    const { lang } = usePage().props;

    return (
        <div className="max-w-6xl m-auto">
            <Head title="Qr Codes" />

            <Title1>{lang.qrCode.plural}</Title1>

            <div className="grid grid-cols-1 gap-2 justify-center md:grid-cols-5">
                <div className="md:col-span-3">
                    <Filter filters={filters} />
                </div>

                <div className="md:col-span-2">
                    <UploadData />
                </div>
            </div>

            <Data qrCodes={page.data} />

            <Paginator links={page.links} />
        </div>
    );
}
