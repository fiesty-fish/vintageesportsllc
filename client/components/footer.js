import React, {Component} from 'react'

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      width: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth})
  }

  render() {
    const curWindowWidth = this.state.width

    if (curWindowWidth > 1007) {
      return (
        <div className="footer-parent">
          <i className="nes-mario" />
          <a
            href="https://github.com/rickylaufitness"
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Ricky Lau
          </a>

          <i className="nes-mario luigi" />
          <a
            href="https://github.com/LuigiLegion"
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Tal Luigi
          </a>

          <i className="nes-mario" />
          <a
            href="https://github.com/xmng"
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Michael Ng
          </a>

          <div>
            <a
              href="https://github.com/fiesty-fish/vintageesportsllc"
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              CONTACT US
            </a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="footer-parent-mobile">
          <i className="nes-mario luigi" />
          <div>
            <a
              href="https://github.com/fiesty-fish/vintageesportsllc"
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              CONTACT US
            </a>
          </div>
        </div>
      )
    }
  }
}

export default Footer
