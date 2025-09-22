import { usePage } from '@inertiajs/react';

export default function CsrfTokenInput() {
    const { session } = usePage().props;

    return (
        <input type="hidden" name="_token" value={session.tokens.csrf} />
    )
}
