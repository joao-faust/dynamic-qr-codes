import NonRequiredField from '../../../Shared/NonRequiredField';
import { usePage } from '@inertiajs/react';

export default function Destination(props) {
    const {
        content,
        setContent,
        message,
        setMessage,
        subject,
        setSubject,
        visibility,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        contentType,
        currentVisibility,
    } = props;

    const { lang } = usePage().props;

    const label = contentType;
    const labelResult = label.toLowerCase() === 'whatsapp'
        ? {
            text: lang.form.fields.type.options.phone.text,
            subText: lang.form.fields.type.options.phone.subText,
        }

        : {
            text: lang.form.fields.type.options[label].text,
            subText: lang.form.fields.type.options[label].subText,
        }
    ;

    return (
        <>
            {contentType === 'text' ? (
                <>
                    <label htmlFor="content" className="label">
                        {lang.form.fields.type.options.text.text}
                    </label>

                    <textarea
                        id="content"
                        className="textarea w-full"
                        placeholder={lang.form.fields.type.options.text.subText}
                        autoComplete="off"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <label htmlFor="content" className="label">{labelResult.text}</label>

                    <input
                        type="text"
                        id="content"
                        className="input w-full"
                        placeholder={labelResult.subText}
                        autoComplete="off"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </>
            )}

            {contentType === 'email' ? (
                <>
                    <div>
                        <label htmlFor="subject" className="label">
                            {lang.form.fields.subject.text}
                        </label>

                        <input
                            type="text"
                            id="subject"
                            className="input w-full"
                            placeholder={lang.form.fields.subject.subText}
                            autoComplete="off"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="label">
                            {lang.form.fields.body.text}
                        </label>

                        <textarea
                            id="message"
                            className="textarea w-full"
                            placeholder={lang.form.fields.body.subText}
                            autoComplete="off"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                </>
            ): contentType === 'whatsapp' ? (
                <>
                    <label htmlFor="message" className="label">
                        {lang.form.fields.message.text}
                    </label>

                    <textarea
                        id="message"
                        className="textarea w-full"
                        placeholder={lang.form.fields.message.subText}
                        autoComplete="off"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </>
            ) : ''}

            {visibility === 'private' ? (
                <>
                    <label
                        htmlFor="password"
                        className="label flex items-center gap-1"
                    >
                        {lang.auth.form.fields.password.text}
                        {currentVisibility === 'private' ? <NonRequiredField /> : '' }
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.password.subText}
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <label htmlFor="password_confirmation" className="label mt-2">
                        {lang.auth.form.fields.passwordConfirmation.text}
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        className="input w-full"
                        placeholder={lang.auth.form.fields.passwordConfirmation.subText}
                        autoComplete="off"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                </>
            ) : ''}
        </>
    );
}
