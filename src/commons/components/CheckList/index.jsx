import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../commons/components/Checkbox'

export default class CheckList extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    optionSelected: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
  }
  render() {
    return (
      <React.Fragment>
        {this.props.items.map(function(item) {
          return (
            <React.Fragment key={item}>
              <Checkbox
                id={item}
                label={item}
                isChecked={this.props.optionSelected.bind(
                  this,
                  this.props.type,
                  item
                )}
                onChange={this.props.handleOptionChange.bind(
                  this,
                  this.props.type,
                  item
                )}
              />
            </React.Fragment>
          )
        }, this)}
      </React.Fragment>
    )
  }
}