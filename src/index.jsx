import * as React from "react";
import * as ReactDOM from "react-dom";
import JediEditor from "./editor";
import isEmpty from "is-empty";

const changeEvent = []
export default class Index {
  constructor(opts) {
    if (isEmpty(opts) || isEmpty(opts.selector)) {
      throw new Error("miss argument")
    }
    let selector = opts.selector.toString().substring(1);
    ReactDOM.render(
      <JediEditor
        menu={opts.menu}
        theme={opts.theme}
        onChange={this.onChange}
        value={opts.value}
      />,
      document.getElementById(selector)
    );
  }
  onChange = (value) => {
    this.value = value;
    if (changeEvent.length > 0) {
      changeEvent.forEach(callback => {
        if (typeof callback === 'function') {
          callback(value)
        }
      })
    }
  }
  on = (e, callback) => {
    if (e === 'change') {
      changeEvent.push(callback)
    } else {
      throw new Error("sorry ,this event " + e + " can't supported");
    }
  }

}
