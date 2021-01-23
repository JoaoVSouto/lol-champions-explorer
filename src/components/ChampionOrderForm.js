import * as React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setIncreasingOrder } from '../ducks/championsSlice';

const ORDER_STATE = {
  INCREASING: 'inc',
  DECREASING: 'dec',
};

function ChampionOrderForm() {
  const dispatch = useDispatch();

  const handleSelectChange = React.useCallback(
    event => {
      const isIncreasingOrder = event.target.value === ORDER_STATE.INCREASING;

      dispatch(setIncreasingOrder(isIncreasingOrder));
    },
    [dispatch]
  );

  return (
    <Form>
      <Form.Group controlId="alphabeticalOrder">
        <Form.Label className="text-light">Alphabetical order:</Form.Label>
        <Form.Control as="select" onChange={handleSelectChange}>
          <option value={ORDER_STATE.INCREASING}>Increasing</option>
          <option value={ORDER_STATE.DECREASING}>Decreasing</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default ChampionOrderForm;
