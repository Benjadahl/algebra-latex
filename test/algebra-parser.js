import { Expression, Equation, Fraction } from 'algebra.js'
import parser from '../src/algebra-parser'
import assert from 'assert'

describe('algebra parser', () => {
  it('should parse simple expression', () => {
    const parsedLatex = [
      {
        type: 'number',
        value: '2'
      }, {
        type: 'operator',
        value: '+'
      }, {
        type: 'variable',
        value: 'x'
      }, {
        type: 'operator',
        value: '='
      }, {
        type: 'number',
        value: '3'
      }
    ]

    let exp = new Expression(2).add('x')
    let exprected = new Equation(exp, new Expression(3))

    assert.equal(parser(parsedLatex).toString(), exprected.toString())
  })

  it('should parse simple expression starting with a fraction', () => {
    const parsedLatex = [
      {
        type: 'token',
        value: 'frac'
      }, {
        type: 'group',
        value: [
          {
            type: 'number',
            value: '2'
          }
        ]
      }, {
        type: 'group',
        value: [
          {
            type: 'number',
            value: '4'
          }
        ]
      }
    ]

    let expected = new Expression(new Fraction(2, 4))
    assert.equal(parser(parsedLatex).toString(), expected.toString())
  })
})