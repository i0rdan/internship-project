import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddReaction, RemoveReaction } from './actions'

export class ReactionStateModel {
    reactions!: string[];
}

@State<ReactionStateModel>({
    name: 'reactions',
    defaults: {
        reactions: []
    }
})
export class ReactionState {

    @Selector()
    static getReactions(state: ReactionStateModel) {
        return state.reactions;
    }

    @Action(AddReaction)
    add({getState, patchState }: StateContext<ReactionStateModel>, { payload }: AddReaction) {
        const state = getState();

        patchState({
            reactions: [...state.reactions, payload]
        })
    }

    @Action(RemoveReaction)
    remove({getState, patchState }: StateContext<ReactionStateModel>, { payload }: RemoveReaction) {
        patchState({
            reactions: getState().reactions.filter((reaction) => {
                reaction != payload;
            })
        })
    }
}