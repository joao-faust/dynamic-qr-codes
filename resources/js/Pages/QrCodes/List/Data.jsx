import { capitalize } from 'lodash';
import { format, isBefore } from 'date-fns';
import { pt, es, enUS } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons/faSquareArrowUpRight';

import ActionsModal from './ActionsModal';
import { Link, usePage } from '@inertiajs/react';

export default function Data(props) {
    const { qrCodes } = props;

    const { lang, session } = usePage().props;

    const locales = { 'pt': pt, 'es': es, 'en': enUS, };

    const elements = qrCodes.map((qrCode, index) => {
        let currentVersion;

        const destinations = qrCode.destinations;

        destinations.map((destination, index) => {
            if (destination.version_id === qrCode.enabled_destination.version_id) {
                currentVersion = index + 1;
            }
        });

        return (
            <tr
                className="border-0 border-b border-gray-300 last:border-0
                text-center"
                key={index}
            >
                <td className="text-start">
                    <div className="flex items-center gap-3">
                        <div className="avatar w-[80px]">
                            <img
                                src={`/storage/qrcodes/${qrCode.filename}.png`}
                                alt="Qr Code"
                            />
                        </div>

                        <div>
                            <div className="font-bold">{qrCode.name}</div>

                            <div className="text-sm opacity-50">
                                {capitalize(qrCode.enabled_destination.type)}
                            </div>
                        </div>
                    </div>
                </td>

                <td>{currentVersion}</td>
                <td>{destinations.length}</td>

                <td>
                    {lang.form.fields.status.options[qrCode.status.toLowerCase()].text}
                </td>

                <td>
                    {lang.form.fields.visibility.options[
                        qrCode.visibility.toLowerCase()
                    ].text}
                </td>

                <td>{qrCode.enabled_destination.visits_count}</td>

                <td>
                    {format(
                        isBefore(
                            qrCode.enabled_destination.updated_at,
                            qrCode.updated_at
                        )
                            ? qrCode.updated_at
                            : qrCode.enabled_destination.updated_at,

                        'MMMM do, yyyy H:mma',

                        { locale: locales[session.locale] }
                    )}
                </td>

                <td className="whitespace-nowrap">
                    <Link
                        className="btn btn-primary btn-square"
                        title={lang.action.options.update.text}
                        aria-label={lang.action.options.update.text}
                        href={`/qrcodes/${qrCode.id}/create`}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>

                    <a
                        className="btn btn-primary btn-square mx-2"
                        title={lang.action.options.goToDestination.text}
                        aria-label={lang.action.options.goToDestination.text}
                        href={`/qrcodes/${qrCode.id}/destination?visit=no`}
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                    </a>

                    <button
                        type="button"
                        className="btn btn-primary btn-square"
                        title={lang.action.options.seeMore.text}
                        aria-label={lang.action.options.seeMore.text}
                        onClick={() => {
                            document
                                .getElementById(`actionsModal${qrCode.id}`)
                                .showModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </td>

                <td className="text-start">
                    <ActionsModal qrCode={qrCode} />
                </td>
            </tr>
        );
    });

    return (
        <div className="overflow-x-auto">
            <table className="table mt-6">
                <thead>
                    <tr className="border-0 border-b border-gray-300 text-center">
                        <th className="text-start">{lang.form.fields.name.text}</th>
                        <th>{lang.meta.currentVersion.text}</th>
                        <th>{lang.meta.lastVersion.text}</th>
                        <th>{lang.form.fields.status.text}</th>
                        <th>{lang.form.fields.visibility.text}</th>
                        <th>{lang.visit.plural}</th>
                        <th>{lang.meta.lastUpdate.text}</th>
                        <th>{lang.action.plural}</th>
                    </tr>
                </thead>

                <tbody>{elements}</tbody>
            </table>
        </div>
    );
}
