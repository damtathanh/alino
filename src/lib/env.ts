const getEnvOptional = (key: string): string | undefined => {
    const value = import.meta.env[key];
    return value || undefined;
};

const getEnvRequired = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    return value;
};

export const ENV = {
    SUPABASE_URL: getEnvRequired('VITE_SUPABASE_URL'),
    SUPABASE_ANON_KEY: getEnvRequired('VITE_SUPABASE_ANON_KEY'),

    // NEW
    SITE_URL: getEnvOptional('VITE_SITE_URL'),
} as const;
