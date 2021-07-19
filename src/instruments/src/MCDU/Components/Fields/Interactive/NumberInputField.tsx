import React from 'react';
import { useMCDUDispatch, useMCDUSelector } from '../../../redux/hooks';
import * as scratchpadActions from '../../../redux/actions/scratchpadActionCreators';

import { useInteractionEvent } from '../../../../Common/hooks';

import { lineColors, lineSizes } from '../../Lines/Line';
import { LINESELECT_KEYS } from '../../Buttons';
import { fieldSides } from '../NonInteractive/Field';
import { scratchpadMessage } from '../../../redux/reducers/scratchpadReducer';

type NumberFieldProps = {
    value: string | undefined,
    nullValue: string,
    min: number,
    max: number,
    color: lineColors,
    side?: fieldSides,
    size: lineSizes,
    selectedCallback: (value?: string) => any,
    lsk: LINESELECT_KEYS,
    prevEntered?: Boolean,
}
const NumberInputField: React.FC<NumberFieldProps> = (
    {
        value,
        nullValue,
        min,
        max,
        color,
        side,
        size,
        selectedCallback,
        lsk,
        prevEntered,
    },
) => {
    const scratchpad = useMCDUSelector((state) => state.scratchpad);
    const dispatch = useMCDUDispatch();
    const addMessage = (msg: scratchpadMessage) => {
        dispatch(scratchpadActions.addScratchpadMessage(msg));
    };
    const clearScratchpad = () => {
        dispatch(scratchpadActions.clearScratchpad());
    };
    const valueIsInRange = (val: number) => min <= val && val <= max;
    const validateEntry = (val: string) => {
        if (prevEntered !== undefined && !prevEntered) {
            addMessage({
                text: 'NOT ALLOWED',
                isAmber: false,
                isTypeTwo: false,
            });
            return false;
        }
        const newVal = parseFloat(val);
        if (Number.isFinite(newVal)) {
            if (valueIsInRange(newVal)) {
                return true;
            }
            addMessage({
                text: 'ENTRY OUT OF RANGE',
                isAmber: false,
                isTypeTwo: false,
            });
            return false;
        }
        addMessage({
            text: 'FORMAT ERROR',
            isAmber: false,
            isTypeTwo: false,
        });
        return false;
    };

    useInteractionEvent(lsk, () => {
        if (scratchpad.currentMessage === 'CLR') {
            selectedCallback(undefined);
        } else {
            const newVal = parseFloat(scratchpad.currentMessage);
            if (validateEntry(scratchpad.currentMessage)) {
                selectedCallback(newVal.toFixed(1));
                clearScratchpad();
            }
        }
    });

    return (
        <span className={`${color} ${side} ${size}`}>{value === undefined ? nullValue : value}</span>
    );
};
export default NumberInputField;