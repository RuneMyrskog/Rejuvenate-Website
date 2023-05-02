import React from 'react';
import './styles.css';

export default class FavoriteThing extends React.Component {

  renderRemoveButton() {
    if (this.props.removable) {
      return (
        <div onClick={ () => this.props.onEditableButtonClick(this.props.name) } id='removeFavoriteThingBtn'><span id='removeFavoriteThingText'>-</span></div>
      )
    }
  }

  renderAddButton() {
    if (this.props.addable) {
      return (
        <div onClick={ () => this.props.onEditableButtonClick(this.props.name) } id='addFavoriteThingBtn'><span id='addFavoriteThingText'>+</span></div>
      )
    }
  }

  render() {
    const { imgSrc, name } = this.props;
    return (
      <div id='favoriteThing'>
        { this.renderRemoveButton() }
        { this.renderAddButton() }
        <div id='desc-box'>
          <img id='favoriteThingImg' src={ imgSrc } alt='profile pic'/>
          <div id='favoriteThingName'>{ name }</div>
        </div>
      </div>
    );
  }
}
