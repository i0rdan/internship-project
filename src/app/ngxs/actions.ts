export class AddTutorial {
    static readonly type = '[TUTORIAL] Add'

    constructor(public payload: string) {}
}

export class RemoveTutorial {
    static readonly type = '[TUTORIAL] Remove'

    constructor(public payload: string) {}
}