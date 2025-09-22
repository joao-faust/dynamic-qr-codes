import { Head, useForm, usePage } from '@inertiajs/react';

import Title1 from '../../../Shared/Title1';
import Title2 from '../../../Shared/Title2';
import FormWrapper from '../../../Shared/FormWrapper';

export default function Login() {
    const { lang } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();

        post('/login', {
            preserveScroll: true ,
            onError: () => setData('password', ''),
        });
    }

    return (
        <div className="max-w-lg m-auto">
            <Head title="Login" />

            <Title1>{lang.auth.user.signIn.text}</Title1>
            <Title2>{lang.auth.user.startSession.text}</Title2>

            <form onSubmit={submit} autoComplete="off">
                <FormWrapper name="Information" error={errors.email || errors.password}>
                    <label htmlFor="email" className="label">
                        {lang.auth.form.fields.email.text}
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.email.subText}
                        autoComplete="off"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />

                    <label htmlFor="password" className="label">
                        {lang.auth.form.fields.password.text}
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.password.text}
                        autoComplete="off"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        disabled={processing}
                    >
                        {lang.auth.user.signIn.text}
                    </button>
                </FormWrapper>
            </form>
        </div>
    );
}
