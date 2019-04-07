import * as React from 'react'

import Router from 'next/router'
import Link, { LinkProps } from 'next/link'

export interface NextLinkProps {
  rootMargin?: string
  threshold?: number
}

export type Props = LinkProps & Readonly<NextLinkProps>

const fetched: string[] = []

class NextLink extends React.PureComponent<Props> {
  intersectionObserver?: IntersectionObserver

  childRef = React.createRef<HTMLElement>()

  componentDidMount () {
    if (!this.childRef.current) {
      return
    }

    this.createObserver()
    this.observeElement(this.childRef.current)
  }

  componentDidUpdate () {
    this.disconnectObserver()

    if (!this.childRef.current) {
      return
    }

    this.createObserver()
    this.observeElement(this.childRef.current)
  }

  componentWillUnmount () {
    this.disconnectObserver()
  }

  handleIntersection = () => {
    const { href } = this.props
    if (!href) {
      return
    }

    let prefetch: string = ''
    if (typeof href === 'object' && href.pathname) {
      prefetch = href.pathname
    }

    if (typeof href === 'string') {
      prefetch = href
    }

    if (!prefetch || fetched.indexOf(prefetch) !== -1) {
      return
    }

    Router.prefetch(prefetch)
    fetched.push(prefetch)
  }

  createObserver = () => {
    const { connection } = navigator as any
    if (connection) {
      if (
        (connection.effectiveType &&
          connection.effectiveType.indexOf('2g') !== -1) ||
        connection.saveData
      ) {
        return
      }
    }

    const { rootMargin, threshold } = this.props

    this.intersectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && this.handleIntersection()
        ),
      {
        rootMargin,
        threshold
      }
    )
  }

  observeElement = (element: HTMLElement) => {
    if (!this.intersectionObserver) {
      return
    }

    this.intersectionObserver.observe(element)
  }

  disconnectObserver = () => {
    if (!this.intersectionObserver) {
      return
    }

    this.intersectionObserver.disconnect()
  }

  render () {
    const { children, ...restProps } = this.props

    const child = React.cloneElement(React.Children.only(children), {
      ref: this.childRef
    })

    return React.createElement(Link, {
      ...restProps,
      children: child
    })
  }
}

export default NextLink
