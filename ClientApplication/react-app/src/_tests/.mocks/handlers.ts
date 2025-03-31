import { ws } from 'msw'

// const speedreader = ws.link();

import { articlesMockDataFilled, articleMockDataEmpty } from './mockConstants';

import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('*/api/Articles', ({ request }) => {
        const url = new URL(request.url);
        const pageNumber = url.searchParams.get('PageNumber');
        const pageSize = url.searchParams.get('PageSize');

        if (pageNumber === '1') {
            return HttpResponse.json(
                articlesMockDataFilled
            ); // Return a JSON response
        }

        return HttpResponse.json(
            {
                articleMockDataEmpty
            }
        ); // Return a JSON response
    }),
];