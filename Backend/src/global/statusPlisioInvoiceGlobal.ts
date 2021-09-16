import { stCancelled, stCompleted, stError, stExpired, stMismatch, stNew, stPending } from "./statusResponsePlisioInvoiceGlobal";

export function statusToCode(status: string): number {
    switch (status) {
        case stNew:
            return 0;
        case stPending:
            return 1;
        case stExpired:
            return 2;
        case stCompleted:
            return 3;
        case stMismatch:
            return 4;
        case stError:
            return 5;
        default:
            return 6;
    }
}