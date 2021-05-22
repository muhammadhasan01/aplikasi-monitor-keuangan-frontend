import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export class BottomTooltip extends Component {
  render() {
    const { children, key, info } = this.props;
    return (
      <OverlayTrigger
        key={key}
        placement="bottom"
        overlay={<Tooltip id="tooltip-bottom">{info}</Tooltip>}
      >
        {children}
      </OverlayTrigger>
    );
  }
}
