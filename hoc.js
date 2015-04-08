import React from 'react'
import jss from 'jss'


export default function createStyledComponent(Component, rules, options) {

  class StyledComponent extends React.Component {

    componentWillMount() {
      this.sheet = jss.createStyleSheet(rules, options).attach()
      this.uuid = uuid
    }

    componentWillUnmount() {
      this.sheet.detach()
      this.sheet = null
    }

    classSet(classNames) {
      return Object
        .keys(classNames)
        .filter(function (className) {
          return classNames[className]
        })
        .map(function (className) {
          return this.sheet.classes[className] || className
        })
        .join(' ')
    }

    render() {
      return (
        <Component
          classes={this.sheet.classes}
          classSet={this.classSet}
          {...this.props}
        />
      )
    }

  }

  // Support React Hot Loader
  if (module.hot) {
    class HotStyledComponent extends StyledComponent {
      componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.sheet.detach()
          this.sheet = jss.createStyleSheet(rules, options).attach()
        }
      }
    }

    return HotStyledComponent
  }

  return StyledComponent
}
