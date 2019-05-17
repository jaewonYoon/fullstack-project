export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("todos")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
      });
  };
};
export const editProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    const data_arr = project;
    console.log(data_arr);
    const firestore = getFirestore();
    firestore
      .collection("todos")
      .doc(project.id)
      .update({
        title: data_arr.title,
        content: data_arr.content,
        priority: data_arr.priority,
        date: data_arr.date
      });
  };
};
export const deleteProject = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //reference to store firebase
    const firestore = getFirestore();
    firestore
      .collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Successfully deleted");
        dispatch({
          type: "DELETE_PROJECT",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_PROJECT_ERROR",
          err
        });
      });
  };
};
