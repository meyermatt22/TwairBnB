import { csrfFetch } from "./csrf";

const CREATE_SEARCH = "/search/CREATE_SEARCH";

export const createSearchAction = (search) => ({
  type: CREATE_SEARCH,
  search,
});

export const createSearchThunk = (search) => async (dispatch) => {
  const { searchedProp, minPrice, maxPrice } = search;
  const newSearch = { searchedProp, minPrice, maxPrice };

  const res = await csrfFetch(`/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSearch),
  });

  if (res.ok) {
    const newSearch = await res.json();
    dispatch(createSearchAction(newSearch));
    return newSearch;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_SEARCH: {
            const newState = { ...state }
            newState[action.search] = action.search;
            return newState
        }
        default:
            return state;
    }
}

export default searchReducer
