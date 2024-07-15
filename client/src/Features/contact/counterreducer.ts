export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export interface counterstate {
  data: number;
  title: string;
}
const initialstate: counterstate = {
  data: 42,
  title: "another redux counter",
};
export function increment(amount = 1) {
  return { type: INCREMENT_COUNTER, payload: amount };
}
export default function counterreducer(state = initialstate, action: any) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - 1,
      };

    default:
      return state;
  }
}
