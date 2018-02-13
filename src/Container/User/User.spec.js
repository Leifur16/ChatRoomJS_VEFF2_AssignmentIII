import React from 'react';
import User from './User';
import { shallow } from 'enzyme';

describe('User tests', () => {

    it('should pass', () => {

            //Arrange
            // npm run test <- command i gitbash
            let input = '';
            const array = mount(<User/>);
            array.find({userNames: []});

            const component = shallow(<User {input = this.state.value;} />);

            //Act
            component.find('input[type="text"]').first().simulate('input', { target: { value: 'search'}});

            //Assert
            expect(array).to.have.length(1);

    });
});
