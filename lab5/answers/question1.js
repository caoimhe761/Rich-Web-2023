// Parent Component
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const dataToPass = 'Hello from Parent!';

  return (
    <div>
      <ChildComponent passedData={dataToPass} />
    </div>
  );
}

// Child Component
import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <p>{props.passedData}</p>
    </div>
  );
}

export default ChildComponent;
