import { Link } from '@inertiajs/react';

export default function Paginator(props) {
    const { links } = props;

    const items = [];

    links.map((link, index) => {
        const { url, active, label } = link;

        let className = 'join-item btn';

        if (!url) {
            className += ' btn-disabled';
        }

        if (active) {
            className += ' btn-active';
        }

        items.push(
            <Link href={url ?? ''} className={className} key={index}>
                <span dangerouslySetInnerHTML={{ __html: label }} />
            </Link>
        );
    });

    return (
        <div className="join mt-2">
            {items}
        </div>
    );
}
