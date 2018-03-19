const initialState = {
  test: 'Jin',
};

const test = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'TEST': {
      return {
        ...state,
        test: 'TEST',
      };
    }
    default: {
      return state;
    }
  }
};

export default test;
