import * as bcrypt from 'bcryptjs';

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

export const cypher = (text: string): Promise<string> => {
    return bcrypt.hash(text, 10)
}

export const compare = (text: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(text, hash)
}
