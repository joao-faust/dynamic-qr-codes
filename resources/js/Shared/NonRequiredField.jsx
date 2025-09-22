import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "@inertiajs/react";

export default function NonRequiredField() {
    const { lang } = usePage().props;

    return (
        <span
            className="text-gray-400 cursor-help"
            title={lang.form.nonRequiredField.text}
            aria-label={lang.form.nonRequiredField.text}
        >
            <FontAwesomeIcon icon={faInfoCircle} />
        </span>
    );
}
