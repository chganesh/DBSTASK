import {
    FILTER_POSTS,
    CLEAR_FILTER,
  } from './types';

  const blogReducer = (state, action) => {
      switch(action.type) {
          case FILTER_POSTS:
              return {
                  ...state,
                  filtered: state.blogs.filter(blog => {
                      const regex = new RegExp(`${action.payload}`, 'ig');
                      return(
                          blog.title.match(regex) || blog.description.match(regex)
                      );
                  })
              }

          case CLEAR_FILTER:
              return {
                  ...state,
                  filtered: null
              }

          default:
              return state;
      }
  }

  export default blogReducer;