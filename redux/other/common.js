import Invoke from "@/net/invoke.js"
// import { createAction } from "redux-actions"


export const types = {
    modifyCitys: "common/modifyCitys",
    modifyJobs: "common/modifyJobs",
}


export const actions = {
    //queryData: createAction(types.modifyData, param => Invoke.knowledge.queryData(param)),

    //查询所有城市信息
    queryCitys: () => (dispatch, getState) => {
        return Invoke.common.queryCitys()
            .then(reply => {
                dispatch(actions.modifyCitys(reply.city))
            })
            .catch(err => {

            })
    },
    modifyCitys: opts => ({ type: types.modifyCitys, payload: opts }),

    //查询所有职位信息
    queryJobs: () => (dispatch, getState) => {
        return Invoke.common.queryJobs()
            .then(reply => {
                dispatch(actions.modifyJobs(reply.common))
            })
            .catch(err => {

            })
    },
    modifyJobs: opts => ({ type: types.modifyJobs, payload: opts }),
}


const initialState = {
    citys: [],
    jobs: [],
}

// Reducer
export default function reducer(state = initialState, { type, payload }) {

    return Immer(state, draft => {

        if (type == types.modifyCitys) {

            draft.citys = payload;

        } else if (type == types.modifyJobs) {

            draft.jobs = payload;

        }

    })

}
