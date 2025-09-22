import { useState } from 'react';

import FormWrapper from '../../../Shared/FormWrapper';
import { usePage } from '@inertiajs/react';

export default function DownloadImage(props) {
    const { id } = props;

    const initialState = {
        size: 250,
        color: '#000000',
        backgroundColor: '#ffffff',
        format: 'png',
        errorCorrection: 'M', // default
    };

    const { lang } = usePage().props;

    const [data, setData] = useState(initialState);

    function submit(e) {
        e.preventDefault();

        e.target.submit();
        setData(initialState);
    }

    return (
        <form
            action={`/qrcodes/${id}/download-image`}
            method="get"
            onSubmit={submit}
        >
            <input type="hidden" name="id" value={id} />

            <FormWrapper title={lang.form.fields.image.text}>
                <label htmlFor="size" className="label">
                    {lang.form.fields.size.text}
                </label>
                <input
                    type="number"
                    id="size"
                    name="size"
                    className="input w-full"
                    placeholder={lang.form.fields.size.subText}
                    min={250}
                    autoComplete="off"
                    value={data.size}
                    onChange={e => setData({ ...data, size: e.target.value })}
                />

                <label htmlFor="format" className="label">
                    {lang.form.fields.format.text}
                </label>
                <select
                    id="format"
                    name="format"
                    className="select w-full"
                    autoComplete="off"
                    value={data.format}
                    onChange={e => setData({ ...data, format: e.target.value })}
                >
                    <option value="png">PNG</option>
                    <option value="svg">SVG</option>
                    <option value="eps">EPS</option>
                </select>

                {/* Campo de correção de erro (error correction) */}
                <label htmlFor="errorCorrection" className="label">
                    {lang.form.fields.errorCorrection.text}
                </label>
                <select
                    id="errorCorrection"
                    name="errorCorrection"
                    className="select w-full"
                    autoComplete="off"
                    value={data.errorCorrection}
                    onChange={e => setData({ ...data, errorCorrection: e.target.value })}
                >
                    <option value="L">
                        {lang.form.fields.errorCorrection.options.L.text}
                    </option>

                    <option value="M">
                        {lang.form.fields.errorCorrection.options.M.text}
                    </option>

                    <option value="Q">
                        {lang.form.fields.errorCorrection.options.Q.text}
                    </option>

                    <option value="H">
                        {lang.form.fields.errorCorrection.options.H.text}
                    </option>
                </select>

                <label htmlFor="color" className="label">
                    {lang.form.fields.color.text}
                </label>
                <input
                    type="color"
                    id="color"
                    name="color"
                    placeholder={lang.form.fields.color.subText}
                    autoComplete="off"
                    value={data.color}
                    onChange={e => setData({ ...data, color: e.target.value })}
                />

                <label htmlFor="backgroundColor" className="label">
                    {lang.form.fields.backgroundColor.text}
                </label>
                <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    placeholder={lang.form.fields.backgroundColor.subText}
                    autoComplete="off"
                    value={data.backgroundColor}
                    onChange={e => {
                        setData({ ...data, backgroundColor: e.target.value });
                    }}
                />

                <button type="submit" className="btn btn-primary">
                    {lang.action.options.download.text}
                </button>
            </FormWrapper>
        </form>
    );
}
