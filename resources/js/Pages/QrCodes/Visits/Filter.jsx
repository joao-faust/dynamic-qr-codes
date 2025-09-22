import { getMonth, getYear } from 'date-fns';
import { useState } from 'react';

import FormWrapper from '../../../Shared/FormWrapper';
import useSearchRequest from '../../../functions/hooks/useSearchRequest';
import { usePage } from '@inertiajs/react';

export default function Filter(props) {
    const { destinations, qrCode, filters } = props;
    const { enabled_destination: enabledDestination } = qrCode;

    const { lang, errors } = usePage().props;

    console.log(errors);

    const makeSearchRequest = useSearchRequest(`/qrcodes/${qrCode.id}/visits`);

    const [data, setData] = useState({
        versionId: filters.versionId ?? enabledDestination.version_id,
        year: filters.year ?? getYear(new Date()),
        month: filters.month ?? getMonth(new Date()) + 1,
    });

    function handleSearch(e, key) {
        const value = e.target.value;
        setData({ ...data, [key]: value });
        makeSearchRequest({ ...filters, [key]: value });
    }

    return (
        <form>
            <FormWrapper
                title={lang.form.filter.text}
                error={errors.versionId || errors.year || errors.month}
            >
                <div className="flex gap-2">
                    <div className="w-full">
                        <label htmlFor="versions" className="label grow">
                            {lang.meta.version.text}
                        </label>

                        <select
                            id="versions"
                            className="select block grow"
                            autoComplete="off"
                            value={data.versionId}
                            onChange={e => handleSearch(e, 'versionId')}
                        >
                            {destinations.map((destination, index) =>
                                <option
                                    value={destination.version_id}
                                    title={destination.content}
                                    key={index}
                                >
                                    {destination.version_id === enabledDestination.version_id
                                        ? `${lang.meta.version.text} ${index + 1}
                                            (${lang.meta.current.text})`
                                        : `${lang.meta.version.text} ${index + 1}`
                                    }
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="year" className="label grow">
                            {lang.meta.year.text}
                        </label>

                        <select
                            id="year"
                            className="select block grow"
                            autoComplete="off"
                            value={data.year}
                            onChange={e => handleSearch(e, 'year')}
                        >
                            {Array
                                .from({ length: data.year - 2025 + 1 }, (_, i) => 2025 + i)
                                .map((year, index) =>
                                    <option value={year} key={index}>{year}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="month" className="label grow">
                            {lang.meta.month.text}
                        </label>

                        <select
                            id="month"
                            className="select block grow"
                            autoComplete="off"
                            value={data.month}
                            onChange={e => handleSearch(e, 'month')}
                        >
                            <option value="1">
                                {lang.meta.month.options.january.text}
                            </option>

                            <option value="2">
                                {lang.meta.month.options.february.text}
                            </option>

                            <option value="3">
                                {lang.meta.month.options.march.text}
                            </option>

                            <option value="4">
                                {lang.meta.month.options.april.text}
                            </option>

                            <option value="5">
                                {lang.meta.month.options.may.text}
                            </option>

                            <option value="6">
                                {lang.meta.month.options.june.text}
                            </option>

                            <option value="7">
                                {lang.meta.month.options.july.text}
                            </option>

                            <option value="8">
                                {lang.meta.month.options.august.text}
                            </option>

                            <option value="9">
                                {lang.meta.month.options.september.text}
                            </option>

                            <option value="10">
                                {lang.meta.month.options.october.text}
                            </option>

                            <option value="11">
                                {lang.meta.month.options.november.text}
                            </option>

                            <option value="12">
                                {lang.meta.month.options.december.text}
                            </option>
                        </select>
                    </div>
                </div>
            </FormWrapper>
        </form>
    );
}
