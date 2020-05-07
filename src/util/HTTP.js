export default class HTTP {
    static request(uri, options) {
        return fetch(uri, options)
            .then(response => {
                if (!response.ok) {
                    console.error('HTTP error', response);
                    return Promise.reject(response);
                }
                return response;
            });
    }
}
