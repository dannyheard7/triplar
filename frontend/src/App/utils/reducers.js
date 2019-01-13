export const loadingReducer = (state = {}, action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST',
    };
};

export const errorReducer = (state = {}, action) => {
    const { type, error } = action;

    const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
    if (!matches) return state;

    const [, requestName, requestState] = matches;

    let errors = null;
    if(requestState === 'FAILURE' && error) {
        if(Array.isArray(error)) {
            errors = error[0].state;
        } else {
            errors = error;
        }

    }

    return {
        ...state,
        [requestName]: errors,
    };
};

