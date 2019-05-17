export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //reference to store firebase
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
        dispatch({
          type: "CREATE_PROJECT",
          project
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
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
