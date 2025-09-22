import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import Layout from './Pages/Layout';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (!page.default.layout) {
            page.default.layout = page => <Layout children={page} />;
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    title: title => `${title}`,
});
