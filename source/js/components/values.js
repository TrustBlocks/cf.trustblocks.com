var AddValueRow = require('./add-value-row');
var ImmutableMixin = require('react-immutable-render-mixin');
var React = require('react');
var ValueRow = require('./value-row');
var panel = React.createFactory(require('./bootstrap-panel'));

var DOM = React.DOM;

module.exports = React.createClass({
  displayName: 'Values',

  mixins: [ImmutableMixin],

  render: function() {
    var values = this.props.values;
    return DOM.div({
      className: 'container'
    }, [
      panel({
        key: 'panel',
        type: 'success',
        heading: 'Fill in the Blanks'
      }, [
        DOM.table({
          key: 'valuesTable table table-condensed',
          className: 'table valuesTable'
        }, [
          DOM.tbody({
            key: 'body'
          },
            values.keySeq().toArray().sort().map(function(fieldName) {
              return React.createElement(ValueRow, {
                key: fieldName,
                field: fieldName,
                value: values.get(fieldName)
              });
            }).concat(React.createElement(AddValueRow, {key: 'add'}))
          )
        ])
      ])
    ]);
  }
});
