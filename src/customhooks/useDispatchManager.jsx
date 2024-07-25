let blahstate = {
    field1: 'test',
    field2: null,
    field3: { sub1: 'test' },
    // ... other fields
    fieldN: false
  };

  function updateState(state, updates) {
    return {
      ...state,        // Spread the existing state properties
      ...updates       // Spread the updates to override specific properties
    };
  }
  
  // Example usage:
  const updates = {
    field1: 'new value',
    field3: { sub1: 'new sub value' },
    fieldN: true
  };

  console.log(blahstate)
  const newState = updateState(blahstate, updates);
  blahstate = newState;
  console.log(blahstate);