const HOME_API_ROOT = 'https://jsonplaceholder.typicode.com';

const requests = {
    del: url =>
        fetch(`${HOME_API_ROOT}${url}`, { _method: 'DEL' }).then((res) => res.json()),
    get: url =>
        fetch(`${HOME_API_ROOT}${url}`, { _method: 'GET' }).then((res) => res.json()),
    put: (url, body) =>
        fetch(`${HOME_API_ROOT}${url}`, { _method: 'PUT', body: body }).then((res) => res.json()),
    post: (url, body) =>
        fetch(`${HOME_API_ROOT}${url}`, { _method: 'POST', body: body }).then((res) => res.json())
};

const Home = {
    todos: () =>
        requests.get(`/todos/`),
    todosByUser: (userId) =>
        requests.get(`/todos/` + userId)
};

export default {
    Home,
    // Auth,
    // setToken: _token => { token = _token; }
};