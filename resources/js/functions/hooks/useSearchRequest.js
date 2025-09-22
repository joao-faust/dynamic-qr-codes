import { debounce } from 'lodash';
import { useCallback } from 'react';
import { router } from '@inertiajs/react';

function useDebounce(callback, time) {
    return useCallback(debounce(callback, time), []);
}

export default function useSearchRequest(uri, time = 500) {
    return useDebounce((filters) => {
        router.get(uri,
            filters,
            { preserveState: true, replace: true }
        );
    }, time);
}
