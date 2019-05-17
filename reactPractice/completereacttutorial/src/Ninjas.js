import React from "react";
import "./Ninjas.css";
const Ninjas = ({ ninjas, deleteNinja }) => {
  const ninjaList = ninjas.map(ninja => {
    if (ninja.age > 20) {
      return (
        <div className="ninja" key={ninja.id}>
          <div> name: {ninja.name}</div>
          <div> age: {ninja.age}</div>
          <div> belt: {ninja.belt}</div>
          <button
            onClick={() => {
              deleteNinja(ninja.id);
            }}
          >
            Delete Ninja
          </button>
        </div>
      );
    }
  });

  return <div className="ninja-list">{ninjaList}</div>;
};

export default Ninjas;
