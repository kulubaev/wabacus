import React from 'react';
import renderer from 'react-test-renderer';
import { Calculator } from '../calculator';

import { mount } from 'enzyme';



describe('calculator component', () => {

  /**
   * UI related test
   * utilizes feetures like 
   * regressing testing agains snapshots
   */

  describe('ui verification', () =>  {

    it ('should not regress and render ui correctly', () => {

      const shot = renderer
        .create(<Calculator/>)
        .toJSON();

      expect(shot).toMatchSnapshot();

    });
  });

  describe('behavior  verification', () => {

    /**
     * intenally stack data structure 
     * has been used to mimick 
     * well known postfix mnemonics
     */


    let props = {};
    let sut = null;

    beforeEach(() => {

      props = {
        OverrideLast: jest.fn((v) => { 
          const infix = sut.prop('infix');
          infix[infix.length -1] = v;
          sut.setProps({editing:true, infix});
        }),

        UpdateNew: jest.fn((v) => { 
          const infix = sut.prop('infix');
          infix.push(v);
          sut.setProps({editing:true, infix});
        }),
        Calculate: jest.fn()
      };

      sut = mount(<Calculator {...props}/>);
     
    });

    it ('should be able to perform unary as expected ', () => {


      /*
       * testing:
       * expression: 24!
       */

      sut.find('button[value="2"]').simulate('click');

      expect(props.OverrideLast.mock.calls.length).toEqual(1);
      expect(props.OverrideLast.mock.calls[0]).toEqual(['2']);


      expect(sut.prop('infix')).toEqual(['2']);
      expect(sut.prop('editing')).toEqual(true);


      sut.find('button[value="4"]').simulate('click');

      expect(props.OverrideLast.mock.calls.length).toEqual(2);
      expect(props.OverrideLast.mock.calls[1]).toEqual(['24']);

      expect(props.Calculate.mock.calls.length).toEqual(0);
      expect(props.UpdateNew.mock.calls.length).toEqual(0);

      expect(sut.prop('infix')).toEqual(['24']);
      expect(sut.prop('editing')).toEqual(true);


      sut.find('button.operator[value="!"]').simulate('click');
      expect(props.Calculate.mock.calls.length).toEqual(1);
    })



    it ('should be able to perform binary operator as expected ', () => {

      /*
       * testing:
       * expression: 3 + 5
       */

      sut.find('button[value="3"]').simulate('click');

      expect(props.OverrideLast.mock.calls.length).toEqual(1);
      expect(props.OverrideLast.mock.calls[0]).toEqual(['3']);

      expect(props.Calculate.mock.calls.length).toEqual(0);
      expect(props.UpdateNew.mock.calls.length).toEqual(0);

      expect(sut.prop('infix')).toEqual(['3']);


      sut.find('button.operator[value="+"]').simulate('click');

      expect(props.UpdateNew.mock.calls.length).toEqual(1);
      expect(props.UpdateNew.mock.calls[0]).toEqual(['+']);

      expect(props.Calculate.mock.calls.length).toEqual(0);
      expect(props.OverrideLast.mock.calls.length).toEqual(1);


      expect(sut.prop('infix')).toEqual(['3', '+']);

      sut.find('button[value="5"]').simulate('click');

      expect(props.UpdateNew.mock.calls.length).toEqual(2);
      expect(props.UpdateNew.mock.calls[1]).toEqual(['5']);
      expect(props.Calculate.mock.calls.length).toEqual(0);


      expect(sut.prop('infix')).toEqual(['3', '+', '5']);


      sut.find('button[value="="]').simulate('click');
      expect(props.Calculate.mock.calls.length).toEqual(1);

      expect(props.UpdateNew.mock.calls.length).toEqual(2);
      expect(props.OverrideLast.mock.calls.length).toEqual(1);

    });

  });



});


