type THeaders = {
    [key: string]: string;
}

type FetchOptions = {
    url: string;
    method: string;
    headers: THeaders;
    body: string;
}

const fetchOptions: FetchOptions = {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: 'put your body here'
}

let response;