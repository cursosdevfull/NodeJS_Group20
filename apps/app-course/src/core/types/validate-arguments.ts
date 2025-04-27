export type ParametersType = "body" | "query" | "params" | "headers";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ValidationArgumentsType = Partial<Record<ParametersType, new (...args: any[]) => any>>;
