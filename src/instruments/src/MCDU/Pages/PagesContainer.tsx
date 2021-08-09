/*
 * A32NX
 * Copyright (C) 2020 FlyByWire Simulations and its contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { useState } from 'react';

import { useInteractionEvent } from '../../Common/hooks';

import InitPage from './FMGC/Init/Init';
import MenuPage from './FMGC/Menu/Menu';
import IdentPage from './FMGC/Ident/Ident';
import { PAGE_KEYS } from '../Components/Buttons';
import FuelPred from './FMGC/Fuel/FuelPred';

const PagesContainer = () => {
    const [currentPage, setCurrentPage] = useState('MENU');
    const pages = {
        INIT: <InitPage />,
        MENU: <MenuPage setPage={setCurrentPage} />,
        IDENT: <IdentPage />,
        FUEL: <FuelPred />,
    };

    useInteractionEvent(PAGE_KEYS.INIT, () => setCurrentPage('INIT'));
    useInteractionEvent(PAGE_KEYS.MENU, () => setCurrentPage('MENU'));
    useInteractionEvent(PAGE_KEYS.ATC, () => setCurrentPage('MENU'));
    useInteractionEvent(PAGE_KEYS.FUEL, () => setCurrentPage('FUEL'));

    return pages[currentPage];
};

export default PagesContainer;