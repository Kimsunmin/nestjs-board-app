export interface Board2 {
    id: string,
    title: string,
    context: string,
    status: Board2Status,
}

export enum Board2Status {
    public = 'PUBLIC',
    private = 'PRIVATE',
}