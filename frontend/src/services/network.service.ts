enum Comparison {
    more,
    less,
    equals ,
    include
}
export type SearchParam = {
    column: number;
    comparison: Comparison;
    searchString: string
}
class NetworkService {
    async get<T>(param: SearchParam | null): Promise<T> {
        if (param) {
            const response = await fetch('http://php.loc', {
                method: "POST",
                body: JSON.stringify({param}),
            });
            return response.json();
        } else {
            const response = await fetch('http://php.loc', {
                method: "POST",
            });
            return response.json();
        }
    }
}

export const networkService = new NetworkService();
