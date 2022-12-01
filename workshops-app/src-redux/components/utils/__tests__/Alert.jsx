import React from 'react';
import Alert from '../Alert';
import { shallow } from 'enzyme';

describe( 'Alert component', () => {
    it( 'should show the message that is passed to it as prop', () => {
        const message = 'Workshops are being fetched';
        const wrapper = shallow( <Alert message={message} /> );
        expect( wrapper.text() ).toContain( message );
    });

    it( 'should use primary as the default theme if none is mentioned', () => {
        const message = 'Workshops are being fetched';
        const wrapper = shallow( <Alert message={message} /> );
        expect( wrapper.find( '.alert' ).hasClass( 'alert-primary' ) ).toBe( true );
    });
    
    it( 'should display with the right theme if one is mentioned', () => {
        const message = 'Workshops are being fetched';
        const wrapper = shallow( <Alert message={message} theme="info" /> );
        expect( wrapper.find( '.alert' ).hasClass( 'alert-info' ) ).toBe( true );
    });
});