import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer_parent">
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
}

export default Footer
