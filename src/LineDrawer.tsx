import * as React from "react";
import * as R from 'ramda';
import styled from 'styled-components';

/**
 * on click, if no line, start line
 * on click, if line already started, add "way point"
 * on double click, if line already started, end line drawing
 */
const getLineProps = (uiPoints: UiPoint[]): LineProps[] => {
  if (uiPoints.length > 1) {
    const starts = R.init(uiPoints);
    const ends = R.tail(uiPoints);
    return R.zip(starts, ends).map(([start, end]) => {
      return {
        x1: start.left,
        y1: start.top,
        x2: end.left,
        y2: end.top,
      };
    });
  }
  return [];
};

type LineProps = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
const LineSegment: React.FC<LineProps> = ({
    x1, y1, x2, y2,
}) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
);

export type LatLng = { lat: number; lng: number };
export type LatLngDetails = {
    lngLat: { lat: number; lng: number };
    point: { x: number; y: number };
};
export type LineDrawerProps = {
    mouseMoveObservable?: { on: (cb: (opts: LatLngDetails) => void) => void };
    clickObservable?: { on: (cb: (opts: LatLngDetails) => void) => void };
    onLineChange?: (line: LatLng[]) => void;
};

type UiPoint = { left: number; top: number; };

type State = {
  start?: LatLngDetails;
  currentPosition?: any;
};
export class LineDrawer extends React.PureComponent<LineDrawerProps, State> {
    state: State = {};

    componentDidMount() {
        this.setup();
    }

    componentDidUpdate() {
        this.breakdown();
        this.setup();
    }

    componentWillUnmount() {
        this.breakdown();
    }

    breakdown() {
      //        document.body.removeEventListener('keypress', this.handleKeyPress);
    }

    setup() {
        const {
          onLineChange,
          clickObservable,
          mouseMoveObservable,
        } = this.props;

        if (mouseMoveObservable) {
          document.body.addEventListener('mousemove', event => {
            if (this.state.start) {
              this.setState({ currentPosition: event });
            }
          });
        }
        if (clickObservable) {
          clickObservable.on(event => {
            const { start } = this.state;
            if (start) {
              // finish the line
              this.setState({ start: undefined }, () => {
                onLineChange([start.lngLat, event.lngLat]);
              });
            } else {
              // set the start
              this.setState({ start: event });
            }
          });
        }
    }

    render() {
      const { currentPosition, start } = this.state;
      if (start && currentPosition) {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ position: 'absolute', zIndex: 2 }}>
            <LineSegment
              x1={start.point.x}
              y1={start.point.y}
              x2={currentPosition.clientX}
              y2={currentPosition.clientY}
            />
          </svg>
        );
      }
      return null;
    }

}
