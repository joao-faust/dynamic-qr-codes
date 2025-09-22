import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import Navbar from './Navbar';
import UpdateProfileModal from '../Users/Profile/UpdateProfileModal';

export default function Layout(props) {
    const { children } = props;

    const { auth, lang, session } = usePage().props;

    useEffect(() => {
        document.documentElement.lang = session.locale;
    }, [session.locale]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="grow w-full px-5">{children}</div>

            <div className="footer sm:footer-horizontal footer-center bg-base-300
                text-base-content p-4 mt-8"
            >
                <p>{lang.footer.text}</p>
            </div>

            {auth ?
                <UpdateProfileModal
                    automatic={!auth.user.data_changed}
                    user={auth.user}
                />
            : ''}
        </div>
    );
}
