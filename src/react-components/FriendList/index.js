import React from 'react';
import FriendEntry from '../FreindEntry';
import {ListGroup} from 'react-bootstrap';
import './styles.css';

export default class FriendList extends React.Component {
    render() {
      const rows = [];
      let lastEntryName = null;
      
      this.props.entries.forEach((entry) => {
        if (entry.name !== lastEntryName) {
        rows.push(
            <ListGroup.Item className="listItem">
                <FriendEntry
                    name={entry.name}
                    avatar={entry.avatar} />
            </ListGroup.Item>
        );
        }}
    );
    return (
        <ListGroup>
            {rows}
        </ListGroup>
      );
    }

}