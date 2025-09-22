import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import FormWrapper from "../../../Shared/FormWrapper";
import Modal from "../../../Shared/Modal";
import NonRequiredField from "../../../Shared/NonRequiredField";

export default function UpdateProfileModal(props) {
    const { automatic, user } = props;

    const { lang } = usePage().props;

    const initialState = {
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        password_confirmation: '',
    };

    const { data, setData, post, errors, processing,
        clearErrors } = useForm(initialState);

    useEffect(() => {
        if (automatic) {
            document.getElementById('updateProfileModal').showModal();
        }
    }, []);

    function submit(e) {
        e.preventDefault();

        post(`/users/update`, {
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById('updateProfileModal').close();
            },
            onError: () => {
                setData('password', '');
                setData('password_confirmation', '');
            },
        });
    }

    function reset() {
        clearErrors();
        setData(initialState);
    }

    return (
        <Modal
            id={'updateProfileModal'}
            title={lang.auth.user.update.text}
            reset={reset}
        >
            <form onSubmit={submit}>
                <FormWrapper
                    title={lang.auth.user.profile.text}
                    error={
                        errors.name ||
                        errors.email ||
                        errors.password ||
                        errors.password_confirmation
                    }
                >
                    <label htmlFor="name" className="label">
                        {lang.form.fields.name.text}
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="input w-full"
                        placeholder={lang.form.fields.name.subText}
                        autoComplete="off"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />

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
                        {user.data_changed ? <NonRequiredField /> : ''}
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.email.subText}
                        autoComplete="off"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />

                    <label htmlFor="passwordConfirmation" className="label">
                        {lang.auth.form.fields.passwordConfirmation.text}
                    </label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.passwordConfirmation.subText}
                        autoComplete="off"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-2"
                        disabled={processing}
                    >
                        {lang.action.options.update.text}
                    </button>
                </FormWrapper>
            </form>
        </Modal>
    );
}
