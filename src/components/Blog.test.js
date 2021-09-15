/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing',
    author: 'robbe'
  }

  const component = render(
    <Blog blog={blog} />
  )
  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))
})