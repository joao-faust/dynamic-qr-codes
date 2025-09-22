import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function Items() {
    const { lang } = usePage().props;

    return (
        <>
            <li>
                <Link href="/">{lang.qrCode.plural}</Link>
            </li>

            <li>
                <Link href="/qrcodes/create">
                    {lang.qrCode.create.text}
                </Link>
            </li>
        </>
    );
}

export default function Navbar() {
    const { auth, lang, session } = usePage().props;

    const [locale, setLocale] = useState(session.locale);

    function updateLang(e) {
        const locale = e.target.value;

        router.post('/update-locale', { locale }, {
            preserveScroll: true,
            onSuccess: () => router.reload(),
        });

        setLocale(locale);
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {auth ?
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden"
                            role="button"
                            aria-activedescendant="Show menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100
                                rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <Items />
                        </ul>
                    </div>
                : ''}

                <Link href="/" className="btn btn-ghost text-xl h-fit hidden lg:block">
                    {lang.slogan.text}
                </Link>
            </div>

            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {auth ?
                        <div className="hidden lg:flex">
                            <Items />
                        </div>
                    : ''}

                    <li>
                        <select
                            id="langSelect"
                            aria-label={lang.locale.update.text}
                            autoComplete="off"
                            value={locale}
                            onChange={updateLang}
                        >
                            <option value="pt">{lang.locale.options.pt.text}</option>
                            <option value="en">{lang.locale.options.en.text}</option>
                            <option value="es">{lang.locale.options.es.text}</option>
                        </select>
                    </li>

                    {auth ?
                        <li className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                className="flex gap-1 font-bold"
                                role="button"
                                aria-label="Show user actions"
                            >
                                <div>{auth.user.name}</div>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100
                                rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link
                                        as="button"
                                        className="text-sm"
                                        onClick={e => {
                                            e.preventDefault();

                                            document
                                                .getElementById('updateProfileModal')
                                                .showModal();
                                        }}
                                    >
                                        {lang.auth.user.profile.text}
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        className="text-sm"
                                    >
                                        {lang.auth.user.logout.text}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    : ''}
                </ul>
            </div>
        </div>
    );
}
