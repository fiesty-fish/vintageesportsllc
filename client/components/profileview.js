import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, updateUserThunk} from '../store/index'

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
    if (event.target.name === 'email') {
      console.log('changed email>>>>>', this.state.email)
    }
  }

  async handleClick(event) {
    event.preventDefault()
    console.log('handleClickCalled!!!!!!')

    if (this.state.password === this.state.reenterPassword) {
      const user = {
        id: this.props.user.id,
        email: this.state.email,
        password: this.state.password
      }
      console.log('>>>>>>>>>user', user)
      // thunk to update user info, make separate obj
      await this.props.updateUser(user)
      // success redirect to success
      console.log('success!!')
      this.setState({
        editInfoSuccess: true
      })
    } else {
      this.setState({
        password: '',
        reenterPassword: '',
        passwordMatch: false
      })
    }
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
              type="email"
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
    },
    // TODO: RIGHT HERE!
    updateUser(user) {
      console.log('called updateUser!!!!!!>>>>>')
      dispatch(updateUserThunk(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(profileview)
