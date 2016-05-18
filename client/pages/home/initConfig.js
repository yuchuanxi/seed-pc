/**
 *
 * @authors     yuChuanXi (http://yuchuanxi.com, wangfei.f2e@gmail.com)
 * @date        2016-04-27 13:12:58
 * @title       title
 * @description description
 */
'use strict';

var
  init_amount = 50000,
  init_risk_index = 5,
  risk_list = [{
      'volatility': 0.0452,
      'rate': 1.0352
    }, {
      'volatility': 0.0564,
      'rate': 1.0401
    }, {
      'volatility': 0.0707,
      'rate': 1.045
    }, {
      'volatility': 0.08539999999999999,
      'rate': 1.0502
    }, {
      'volatility': 0.0992,
      'rate': 1.0549
    }, {
      'volatility': 0.113,
      'rate': 1.0596
    }, {
      'volatility': 0.1274,
      'rate': 1.0645
    }, {
      'volatility': 0.14300000000000002,
      'rate': 1.0697
    }, {
      'volatility': 0.1574,
      'rate': 1.0745
    }, {
      'volatility': 0.172,
      'rate': 1.0793
    }, {
      'volatility': 0.1885,
      'rate': 1.0842
    }
  ],
  year = 10,
  monthPerYear = 12,
  totalMonth = year * monthPerYear + 1,
  today = new Date(),
  i = 0,
  date_points = [];

for (; i < totalMonth; i++) {
  date_points.push(offsetDate(today, i));
}

function offsetDate (date, i) {
  date = new Date(date); // copy date
  return new Date(date.setMonth(date.getMonth() + i));
}

module.exports = {
  riskList: risk_list,
  amount: init_amount,
  initRiskIndex: init_risk_index,
  datePoints: date_points
};
