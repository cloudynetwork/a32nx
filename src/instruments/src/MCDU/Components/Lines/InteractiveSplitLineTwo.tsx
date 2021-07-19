import React from 'react';
import { useInteractionEvent } from '../../../util';
import { LINESELECT_KEYS } from '../Buttons';
import { fieldSides } from '../Fields/NonInteractive/Field';
import { lineColors, lineSides, lineSizes } from './Line';
import * as scratchpadActions from '../../redux/actions/scratchpadActionCreators';
import '../styles.scss';
import { useMCDUDispatch, useMCDUSelector } from '../../redux/hooks';

export type fieldProperties = {
    lValue: string,
    lSide?: fieldSides,
    lColour: lineColors,
    lSize: lineSizes
    rValue: string,
    rSide?: fieldSides,
    rColour: lineColors,
    rSize: lineSizes

}

type interactiveSplitLineTwoProps = {
    side: lineSides,
    slashColor: lineColors
    lsk: LINESELECT_KEYS,
    properties: fieldProperties,

    autoCalc?: () => any,
    selectedCallback: (lvalue: string, rvalue: string) => any,
    selectedValidation: (lvalue: string, rvalue: string) => Boolean,
}
/**
 * Interactive Split line v2.0
 */
const InteractiveSplitLineVTwo: React.FC<interactiveSplitLineTwoProps> = (
    {
        selectedCallback,
        selectedValidation,
        lsk,
        autoCalc,
        slashColor,
        properties,
        side,
    },
) => {
    const scratchpad = useMCDUSelector((state) => state.scratchpad);
    const dispatch = useMCDUDispatch();
    const clearScratchpad = () => {
        dispatch(scratchpadActions.clearScratchpad());
    };
    function splitScratchpadValue() {
        let [leftValue, rightValue] = scratchpad.currentMessage.split('/');

        if (leftValue.length <= 0) {
            leftValue = '';
        }
        if (rightValue) {
            if (rightValue.length <= 0) {
                rightValue = '';
            }
        }
        return [leftValue, rightValue];
    }

    useInteractionEvent(lsk, () => {
        if (scratchpad.currentMessage === '' && autoCalc) {
            autoCalc();
        } else if (scratchpad.currentMessage === 'CLR') {
            selectedCallback('', '');
        } else {
            const [lVal, rVal] = splitScratchpadValue();
            if (selectedValidation(lVal, rVal)) {
                selectedCallback(lVal, rVal);
                clearScratchpad();
            }
        }
    });

    return (
        <p className={`line ${side}`}>
            <span className={`${properties.lColour} ${properties.lSide} ${properties.lSize}`}>{properties.lValue}</span>
            <span className={`${slashColor}`}>/</span>
            <span className={`${properties.rColour} ${properties.rSide} ${properties.rSize}`}>{properties.rValue}</span>
        </p>
    );
};
export default InteractiveSplitLineVTwo;