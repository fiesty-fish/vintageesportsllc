export const burgerStyles = {
  /* Position and sizing of burger button */
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '17.5px',
    top: '17.5px'
  },

  /* Color/shape of burger icon bars */
  bmBurgerBars: {
    background: '#f7d51d'
  },

  /* Color/shape of burger icon bars on hover*/
  bmBurgerBarsHover: {
    background: '#a90000'
  },

  /* Position and sizing of clickable cross button */
  bmCrossButton: {
    height: '24px',
    width: '24px',
    backgroundColor: '#424242'
  },

  /* Color/shape of close button cross */
  bmCross: {
    background: '#bdc3c7'
  },

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  bmMenuWrap: {
    height: '100%',
    top: '0px'
  },

  /* General sidebar styles */
  bmMenu: {
    background: '#92cc41',
    // padding: '2.5em 1.5em 0',
    fontSize: '0.65em'
  },

  /* Morph shape necessary with bubble or elastic */
  bmMorphShape: {
    fill: '#373a47'
  },

  /* Wrapper for item list */
  bmItemList: {
    color: '#b8b7ad',
    backgroundColor: '#92cc41',
    padding: '1em'
  },

  /* Individual item */
  bmItem: {
    display: 'inline-block'
  },

  /* Styling of overlay */
  bmOverlay: {
    top: '0px',
    right: '0px',
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export const divStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 'none'
}

export const linkStyles = {
  flex: 1,
  alignSelf: 'flex-start'
}
