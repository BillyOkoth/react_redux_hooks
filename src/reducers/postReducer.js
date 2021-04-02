import { FETCH_POSTS, NEW_POST, SEARCH_POST } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload,
        items: [...state.items, action.payload],
      };
    case SEARCH_POST:
      let value = action.payload;

      let filteredValues = state.items.filter((itema) => {
        if (value) {
          return itema.title.toLowerCase().includes(value);
        } else {
          return FETCH_POSTS;
        }
      });

      return {
        ...state,
        items: filteredValues,
      };
    default:
      return state;
  }
}
