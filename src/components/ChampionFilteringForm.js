import * as React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setNameCriteria } from '../ducks/filteringSlice';

function ChampionFilteringForm() {
  const dispatch = useDispatch();

  const handleNameChange = React.useCallback(
    event => {
      dispatch(setNameCriteria(event.target.value));
    },
    [dispatch]
  );

  return (
    <Form className="flex-grow-1 mr-md-3">
      <Form.Group controlId="nameCriteria">
        <Form.Label className="text-light">Filter by name:</Form.Label>
        <Form.Control onChange={handleNameChange} />
      </Form.Group>
    </Form>
  );
}

export default ChampionFilteringForm;
