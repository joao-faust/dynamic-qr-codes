import { Head, usePage } from '@inertiajs/react';

import Title1 from '../../../Shared/Title1';
import Filter from './Filter';
import History from './History';

export default function Visits(props) {
    const { destinations, page, qrCode, filters } = props;

    const { lang } = usePage().props;

    return (
        <div className="max-w-2xl m-auto">
            <Head title={lang.visit.plural} />

            <Title1>{lang.visit.plural}</Title1>

            <Filter destinations={destinations} qrCode={qrCode} filters={filters} />

            <History visits={page.data} />
        </div>
    );
}
