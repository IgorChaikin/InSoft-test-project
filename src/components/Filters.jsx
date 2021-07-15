import React from 'react';
import '../styles/Filters.scss';

class Filters extends React.Component {
  renderTags(
    tags,
    callback,
    all = false
  ) {
    const tagList =
      all
        ? tags
        : tags.slice(
            0,
            2
          );

    return tagList?.map(
      (
        elem
      ) => (
        <button
          type="button"
          key={
            elem.id
          }
          className={`tag tag_${
            elem.isActive
              ? ''
              : 'in'
          }active`}
          onClick={() =>
            callback(
              elem.id
            )
          }
        >
          #
          {
            elem.name
          }
        </button>
      )
    );
  }

  render() {
    const tags =
      this.renderTags(
        this
          .props
          .tags,
        this
          .props
          .onSwitch,
        this
          .props
          .all
      );

    return (
      <div className="filters">
        <p className="filters__header">
          filters
        </p>
        <p>
          {
            tags
          }
          <button
            type="button"
            className="all"
            onClick={() =>
              this.props.onSwitchAll()
            }
          >
            <img
              src="/settings.svg"
              alt="settings.svg"
            />
            {`${
              this
                .props
                .all
                ? 'hide'
                : 'all'
            } filters`}
          </button>
        </p>
      </div>
    );
  }
}

export default Filters;