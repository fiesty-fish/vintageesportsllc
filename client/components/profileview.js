import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/index'

class profileview extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      reenterPassword: '',
      passwordMatch: true,
      editInfoSuccess: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.loadUserData()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(event) {
    event.preventDefault()
    if (this.state.password !== this.reenterPassword) {
      this.setState({
        password: '',
        reenterPassword: '',
        passwordMatch: false
      })
    }
    // thunk to update user info
    // success redirect to success
    console.log('success!!')
    this.setState({
      editInfoSuccess: true
    })
  }

  render() {
    if (this.state.editInfoSuccess) {
      return <p>Edit info successful!</p>
    } else {
      return (
        <div>
          <form>
            <label>Email</label>
            <input
              type="text"
              name="email"
              defaultValue={this.props.user.email}
              onChange={e => this.handleChange(e)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={e => this.handleChange(e)}
              required
            />

            <label>Re-Enter Password</label>
            <input
              type="password"
              name="reenterPassword"
              onChange={e => this.handleChange(e)}
              required
            />
            <br />
            <button type="submit" onClick={e => this.handleClick(e)}>
              Submit
            </button>
          </form>
          {/* password match msg */}
          {this.state.passwordNotMatch ? <p>Passwords don't match</p> : null}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData() {
      dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(profileview)
