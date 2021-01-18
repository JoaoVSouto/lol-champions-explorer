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
    <Form>
      <Form.Group controlId="nameCriteria" className="mb-4">
        <Form.Label className="text-light">Filtro por nome:</Form.Label>
        <Form.Control onChange={handleNameChange} />
      </Form.Group>
    </Form>
  );
}

export default ChampionFilteringForm;
