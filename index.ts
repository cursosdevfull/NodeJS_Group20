type Options = {
    url: string;
    method: string;
    headers: {
        [key: string]: string;
    }
}

const options: Options = {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
    }
}