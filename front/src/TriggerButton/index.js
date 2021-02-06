import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal, classButton }) => {
  return (
    <button
      className={classButton}
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
