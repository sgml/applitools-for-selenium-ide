import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Checkbox extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };
  render() {
    const checked = (this.props.checked || (this.props.hasOwnProperty("checked") && this.props.checked !== false));
    return (
      <div className="control">
        <input
          key="checkbox"
          type="checkbox"
          className="checkbox"
          id={this.props.id}
          name={this.props.name}
          checked={checked}
          onChange={this.props.onChange}
        />
        <label key="label" htmlFor={this.props.id}><span>{checked ? "✓" : ""}</span><div>{this.props.label}</div></label>
      </div>
    );
  }
}