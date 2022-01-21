import React, {useEffect, useState, useRef} from 'react';
import PropsType from 'prop-types';
import {isFunction} from 'underscore';

const TimeRun = ({time, render, type = "run"}) => {
    const forceUpdate = useState(false)[1];
    const tm = useRef(time);

    let _interval = false;

    useEffect(() => {
        tm.current = time;
        _interval = setInterval(() => {
            if (tm.current <= 0) {
                tm.current = 0;
                if (_interval) {
                    clearInterval(_interval);
                    _interval = false;
                }
            } else tm.current = tm.current - 1;
            forceUpdate(prev => !prev);
        }, 1000 );
        // }, 1000 + (time ? type !== "sleep" ? (11000 / time) : (1000 / time) : 0));

        return () => {
            if (_interval) {
                clearInterval(_interval);
                _interval = false;
            }
        }
    }, [time])

    return (
        <>
            {isFunction(render) && render(tm.current)}
        </>
    );
};

TimeRun.propTypes = {
    time: PropsType.oneOfType([PropsType.string, PropsType.number]),
    title: PropsType.string,
};

TimeRun.defaultProps = {
    time: 60,
    title: '',
};

export default TimeRun;