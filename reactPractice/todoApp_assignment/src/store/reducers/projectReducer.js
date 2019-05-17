const initState = {
  projects: [{ title: "wow", content: "hello", id: 1 }]
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("created project", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("create project error", action.err);
      break;
    case "DELETE_PROJECT":
      console.log("deleted project", action.id);
      return state;
    case "DELETE_PROJECT_ERROR":
      console.log("delete project error", action.err);
      break;
    default:
      return state;
  }
};

export default projectReducer;
