import { ClientError } from "./clientError";

export class InvariantError extends ClientError{
    constructor(message: string) {
        super(message);
        this.name = 'InvariantError'
    }
}