import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setChampionsOrder } from '../ducks/championsSlice';

const ORDER_STATE = {
  INCREASING: 'inc',
  DECREASING: 'dec',
};

function ChampionOrderForm() {
  const dispatch = useDispatch();

  const isIncreasingOrder = useSelector(
    state => state.champions.isIncreasingOrder
  );

  const selectValue = React.useMemo(
    () => (isIncreasingOrder ? ORDER_STATE.INCREASING : ORDER_STATE.DECREASING),
    [isIncreasingOrder]
  );

  const handleSelectChange = React.useCallback(
    event => {
      const isIncreasing = event.target.value === ORDER_STATE.INCREASING;

      dispatch(setChampionsOrder(isIncreasing));
    },
    [dispatch]
  );

  return (
    <Form>
      <Form.Group controlId="alphabeticalOrder">
        <Form.Label className="text-light">Alphabetical order:</Form.Label>
        <Form.Control
          as="select"
          value={selectValue}
          onChange={handleSelectChange}
        >
          <option value={ORDER_STATE.INCREASING}>Increasing</option>
          <option value={ORDER_STATE.DECREASING}>Decreasing</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default ChampionOrderForm;
