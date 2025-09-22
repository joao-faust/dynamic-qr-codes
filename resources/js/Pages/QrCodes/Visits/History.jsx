import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Visits(props) {
    const { visits } = props;

    const { lang } = usePage().props;

    const className = 'flex items-center justify-between px-4 py-3' +
        ' hover:bg-gray-50 transition';

    const borderBottomClassName = 'border-b border-gray-300';

    let totalVisits = 0;

    const history = visits.map((visit, index) => {
        totalVisits += visit.total;

        let visitClassName = className;

        if (index < visits.length - 1) {
            visitClassName += ` ${borderBottomClassName}`;
        }

        return (
            <div key={index} className={visitClassName}>
                <span className="text-sm text-gray-600">
                    {lang.meta.day.text} {Number(format(visit.date, 'd')) + 1}
                </span>

                <span className="badge badge-neutral">{visit.total}</span>
            </div>
        );
    });

    return (
        <div className="mt-4">
            <div className={`${className} ${borderBottomClassName}`}>
                <span className="text-sm text-gray-600">{lang.meta.total.text}</span>
                <span className="badge badge-neutral">{totalVisits}</span>
            </div>

            {history}
        </div>
    );
}
