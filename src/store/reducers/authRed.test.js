import { configure, shallow } from 'enzyme';
import reducer from './authRed';
import * as actionTypes from '../actions/actions';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe("[Auth Reducer]", () => {
    // let wrapper;
    // beforeEach(() => wrapper = shallow(<NavigationItems />))

    it("should return initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        })
    })

    it("should store token on login", () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, { 
            type: actionTypes.AUTH_SUCCESS, 
            payload: {
                token: "some-token",
                userId: "some-userId"
            }
        })).toEqual({
            token: "some-token",
            userId: "some-userId",
            error: null,
            loading: false
        })
    })
})