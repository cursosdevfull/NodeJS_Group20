
export type ResponseByPage<T> = {
    total: number;
    page: number;
    limit: number;
    data: T[];
}