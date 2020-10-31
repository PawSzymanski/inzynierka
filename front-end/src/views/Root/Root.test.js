import {shallow} from "enzyme";
import React from "react";
import {Root} from "./Root";
import Header from "../../components/Header/Header";
import configureMockStore from "redux-mock-store";

import Modal from "../../components/Modal/Modal";

const mockStore = configureMockStore([  ]);
const storeStateMock = {
    myReducer:{
        isModalOpen:true,
    }
};

function setupRoot() {

    let store = mockStore(storeStateMock);
    let props = {
        store: store,
        isModalOpen:true,
    };

    const enzymeWrapper = shallow(<Root  {...props}  />);

    return {
        enzymeWrapper
    }
}

describe('Root components are rendered', () => {
    const { enzymeWrapper } = setupRoot()
   // console.log(enzymeWrapper.debug());

    it('Header is exist', () => {
        expect(enzymeWrapper.containsMatchingElement(<Header />)).toEqual(true);
    });

    it('Modal is exist', () => {
        expect(enzymeWrapper.containsMatchingElement(<Modal />)).toEqual(true);
    });

})
