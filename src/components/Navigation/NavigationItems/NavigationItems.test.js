import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() })

describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<NavigationItems />))

    it("should render two <NavigationItem /> elements if not signed in", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it("should render three <NavigationItem /> elements if logged in", () => {
        wrapper.setProps({ isLoggedIn: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it("should render <NavigationItem> with a 'Login/Sign Up' element if logged in", () => {
        wrapper.setProps({ isLoggedIn: true })
        expect(wrapper.contains( <NavigationItem link="/auth">Login/Sign Up</NavigationItem>))
    })
})