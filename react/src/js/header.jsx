import React, { Component } from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      termModalOpen: false
    }
  }

  handleClickModal() {
    this.setState({ termModalOpen: true })
  }

  handleModalClose() {
    this.setState({ termModalOpen: false })
  }

  render() {
    return (
      <nav>
        <a href="#" onClick={this.handleClickModal.bind(this)}>Term of use</a>
        <a href="https://github.com/builderscon/session-timer" target="_blank">Github</a>
        {this.state.termModalOpen &&
          <ModalContainer>
            <ModalDialog className="modal" onClose={this.handleModalClose.bind(this)}>
              <h2>Builderscon session timer</h2>

              <h3>Term of service</h3>
              <p>Please read it using the following link: <a href="./tos.txt" target="_blank">Term of service</a></p>

              <h3>License</h3>
              <p><a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a></p>
            </ModalDialog>
          </ModalContainer>
        }
      </nav>
    )
  }
}
