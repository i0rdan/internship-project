export class AddReaction {
    static readonly type = '[REACTION] Add'

    constructor(public payload: string) {}
}

export class RemoveReaction {
    static readonly type = '[REACTION] Remove'

    constructor(public payload: string) {}
}