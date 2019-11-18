export const requestHandler = (url: string, method: 'GET' | 'POST' = 'GET'): Promise<JSON> =>
    fetch(url, { method }).then(x => x.json());
