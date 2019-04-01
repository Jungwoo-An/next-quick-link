import * as React from 'react'

import Link, { LinkProps } from 'next/link'

export interface NextLinkProps {
  rootMargin?: string
  threshold?: number
}

export type Props = LinkProps & Readonly<NextLinkProps>

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

  handleIntersection = (target: Element) => {}

  createObserver = () => {
    const { rootMargin, threshold } = this.props

    this.intersectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && this.handleIntersection(entry.target)), {
      rootMargin,
      threshold
    })
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
