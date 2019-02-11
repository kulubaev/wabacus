import http from './http';
import {
  uri,
  PRODUCT,
  DIVIDE,
  SUM,
  DEDUCT,
  FACTORIAL,
  CUBE_ROOT,
  SQUARE_ROOT,
  POWER,
  ALL
}  from './constants';

class Arithmetics { 

  static calculate(params, operation) {
    
    let operator = '';

    switch(operation) {
      case '*':
        operator = PRODUCT;
        break;
      case '+':
        operator = SUM;
        break;
      case '/':
        operator = DIVIDE;
        break;
      case '-':
        operator = DEDUCT;
        break;
      case 'sqrt':
        operator = SQUARE_ROOT;
        break;
      case 'cbrt':
        operator = CUBE_ROOT;
        break;
      case '^':
        operator = POWER;
        break;
      case '!':
        operator = FACTORIAL;
        params[0] = parseInt(params[0]);
        break;
      default:
        break;
    }


    return new Promise((resolve, reject) => { http
      .exec(`${uri}/${operator}/${params.join('/')}`)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

  }

  static chrono(interval, page) {

    return new Promise((resolve, reject) => { 
      http
        .exec(`${uri}/chrono/${interval}/${!isNaN(parseInt(page) && interval !== ALL) ? page :''}`)
        .then((result) => {
          resolve(result);
        })
        .catch((error) =>  reject(error))
    })
  }

}

export default Arithmetics;
