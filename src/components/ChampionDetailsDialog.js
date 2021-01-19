import * as React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

import { SPLASH_LOL_URL } from '../constants';

function ChampionDetailsDialog({ championId, onClose }) {
  const champion = useSelector(state =>
    state.champions.items.find(champion => champion.id === championId)
  );

  const handleClose = () => onClose();

  return (
    <>
      <Modal show centered onHide={handleClose}>
        <Image fluid src={`${SPLASH_LOL_URL}/${champion.id}_0.jpg`} />

        <Modal.Header className="flex-column">
          <Modal.Title>
            {champion.name},<small>{champion.title}</small>
          </Modal.Title>

          <div className="mt-1">
            {champion.tags.map(tag => (
              <Badge key={tag} pill variant="dark" className="mr-1 p-2">
                {tag}
              </Badge>
            ))}
          </div>
        </Modal.Header>
        <Modal.Body>{champion.blurb}</Modal.Body>
      </Modal>
    </>
  );
}

export default ChampionDetailsDialog;
