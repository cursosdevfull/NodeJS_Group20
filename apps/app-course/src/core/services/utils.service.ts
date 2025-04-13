// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const removeEmptyProperties = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            return true;
        })
    );
}