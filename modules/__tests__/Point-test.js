import expect from 'expect'
import React from 'react'
import { render } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import Point from '../index'

const touch = (clientX, clientY) => ({
  clientX,
  clientY
})

describe('A <Point>', () => {
  let node
  beforeEach(() => {
    node = document.createElement('div')
  })

  describe('when it is clicked', () => {
    it('calls the onPoint callback', () => {
      let called = false

      render(<Point onPoint={() => called = true}/>, node, () => {
        Simulate.click(node.firstChild)

        expect(called).toBe(true)
      })
    })
  })

  describe('when it is "tapped"', () => {
    it('calls the onPoint callback', () => {
      let called = false

      render(<Point onPoint={() => called = true}/>, node, () => {
        Simulate.touchStart(node.firstChild, { touches: [ touch(0, 0) ] })
        Simulate.touchEnd(node.firstChild, { touches: [ touch(0, 0) ] })

        expect(called).toBe(true)
      })
    })
  })

  describe('when a touch moves around too much', () => {
    it('does not call the onPoint callback', () => {
      let called = false

      render(<Point onPoint={() => called = true}/>, node, () => {
        Simulate.touchStart(node.firstChild, { touches: [ touch(0, 0) ] })
        Simulate.touchMove(node.firstChild, { touches: [ touch(0, 20) ] })
        Simulate.touchEnd(node.firstChild, { touches: [ touch(0, 0) ] })

        expect(called).toBe(false)
      })
    })
  })

  describe('when a touch is canceled', () => {
    it('does not call the onPoint callback', () => {
      let called = false

      render(<Point onPoint={() => called = true}/>, node, () => {
        Simulate.touchStart(node.firstChild, { touches: [ touch(0, 0) ] })
        Simulate.touchCancel(node.firstChild)

        expect(called).toBe(false)
      })
    })
  })
})