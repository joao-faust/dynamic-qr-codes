import { useState } from 'react';

import useSearchRequest from '../../../functions/hooks/useSearchRequest';
import FormWrapper from '../../../Shared/FormWrapper';
import { usePage } from '@inertiajs/react';

export default function Filter(props) {
    const { filters } = props;

    const { lang, errors } = usePage().props;

    const makeSearchRequest = useSearchRequest('/');

    const [data, setData] = useState({
        nameFilter: filters.nameFilter ?? '',
        contentTypeFilter: filters.contentTypeFilter ?? '',
        visibilityFilter: filters.visibilityFilter ?? '',
        statusFilter: filters.statusFilter ?? '',
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
                error={
                    errors.name ||
                    errors.contentType ||
                    errors.visibility ||
                    errors.status
                }
            >
                <div className="flex gap-2">
                    <div className="w-full">
                        <label htmlFor="nameFilter" className="label">
                            {lang.form.fields.name.text}
                        </label>

                        <input
                            type="text"
                            id="nameFilter"
                            className="input w-full"
                            placeholder={lang.form.fields.name.subText}
                            autoComplete="off"
                            value={data.name}
                            onChange={e => handleSearch(e, 'nameFilter')}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="contentTypeFilter" className="label">
                            {lang.form.fields.contentType.text}
                        </label>

                        <select
                            id="contentTypeFilter"
                            className="select w-full"
                            autoComplete="off"
                            value={data.contentTypeFilter}
                            onChange={e => handleSearch(e, 'contentTypeFilter')}
                        >
                            <option value="">
                                {lang.form.fields.type.options.all.plural}
                            </option>

                            <option value="text">
                                {lang.form.fields.type.options.text.text}
                            </option>

                            <option value="url">
                                {lang.form.fields.type.options.url.text}
                            </option>

                            <option value="email">
                                {lang.form.fields.type.options.email.text}
                            </option>

                            <option value="phone">
                                {lang.form.fields.type.options.phone.text}
                            </option>

                            <option value="whatsapp">
                                {lang.form.fields.type.options.whatsapp.text}
                            </option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="visibilityFilter" className="label">
                            {lang.form.fields.visibility.text}
                        </label>

                        <select
                            id="visibilityFilter"
                            className="select w-full"
                            autoComplete="off"
                            value={data.visibilityFilter}
                            onChange={e => handleSearch(e, 'visibilityFilter')}
                        >
                            <option value="">
                                {lang.form.fields.visibility.options.all.plural}
                            </option>

                            <option value="public">
                                {lang.form.fields.visibility.options.public.text}
                            </option>

                            <option value="private">
                                {lang.form.fields.visibility.options.private.text}
                            </option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="statusFilter" className="label">
                            {lang.form.fields.status.text}
                        </label>

                        <select
                            id="statusFilter"
                            className="select w-full"
                            autoComplete="off"
                            value={data.statusFilter}
                            onChange={e => handleSearch(e, 'statusFilter')}
                        >
                            <option value="">
                                {lang.form.fields.status.options.all.plural}
                            </option>

                            <option value="enabled">
                                {lang.form.fields.status.options.enabled.text}
                            </option>

                            <option value="disabled">
                                {lang.form.fields.status.options.disabled.text}
                            </option>
                        </select>
                    </div>
                </div>
            </FormWrapper>
        </form>
    );
}
