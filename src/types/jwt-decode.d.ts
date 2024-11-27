declare module 'jwt-decode' {
    function jwt_decode<T = any>(encoded: string): T;
    export = jwt_decode;
}