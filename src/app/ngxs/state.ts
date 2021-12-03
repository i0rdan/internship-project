import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddTutorial, RemoveTutorial } from './actions'

export class TutorialStateModel {
    tutorials!: string[];
}

@State<TutorialStateModel>({
    name: 'tutorials',
    defaults: {
        tutorials: []
    }
})
export class TutorialState {

    @Selector()
    static getTutorials(state: TutorialStateModel) {
        return state.tutorials;
    }

    @Action(AddTutorial)
    add({getState, patchState }: StateContext<TutorialStateModel>, { payload }:AddTutorial) {
        const state = getState();
        patchState({
            tutorials: [...state.tutorials, payload]
        })
    }

    @Action(RemoveTutorial)
    remove({getState, patchState }: StateContext<TutorialStateModel>, { payload }:RemoveTutorial) {
        patchState({
            tutorials: getState().tutorials.filter(a => a != payload)
        })
    }

}